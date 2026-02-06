import argparse
from src.database import DatabaseManager
from src.processor import read_file, chunk_text

# Main CLI handler
def run_cli():
    parser = argparse.ArgumentParser(description="Text Chunking & Search System")
    subparsers = parser.add_subparsers(dest="command")
    
    # Load command: ingest a text file
    load_parser = subparsers.add_parser("load")
    load_parser.add_argument("--file", required=True)
    
    # Search command: find chunks by keyword
    search_parser = subparsers.add_parser("search")
    search_parser.add_argument("--query", required=True)
    
    args = parser.parse_args()
    db = DatabaseManager()
    
    # Handle LOAD command
    if args.command == "load":
        try:
            print(f"Reading file: {args.file}...")
            content = read_file(args.file)
            
            print("Chunking text...")
            chunks = chunk_text(content)
            
            print(f"Saving {len(chunks)} chunks to database...")
            for i, chunk in enumerate(chunks):
                word_count = len(chunk.split())
                db.save_chunk(args.file, i+1, chunk, word_count)
                
            print("Success! File ingested.")
        except Exception as e:
            print(f"Error: {e}")
    
    # Handle SEARCH command
    elif args.command == "search":
        print(f"Searching for: '{args.query}'...")
        results = db.search_by_keyword(args.query)
        
        if not results:
            print("No matches found.")
        else:
            print(f"Found {len(results)} matches:\n")
            for res in results:
                filename, chunk_id, content, _ = res
                preview = content[:100].replace('\n', ' ') + "..."
                print(f"[ID: {chunk_id}] File: {filename}")
                print(f"Preview: {preview}")
                print("-" * 40)
    else:
        parser.print_help()

if __name__ == "__main__":
    run_cli()
