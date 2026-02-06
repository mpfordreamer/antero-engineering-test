# Text Chunking & Search System (Test 1)

A CLI tool to ingest text files, chunk them into 300-500 words, store in SQLite, and search by keyword.

## Requirements

- Python 3.8+
- python-docx (for Word documents)

```bash
pip install python-docx
```

## Usage

### 1. Load a File
```bash
python main.py load --file data/sample.txt
python main.py load --file data/document.docx
```

### 2. Search by Keyword
```bash
python main.py search --query "Mars"
```

## Project Structure
```
Test 1/
├── main.py           # Entry point
├── src/
│   ├── cli.py        # CLI argument handling
│   ├── database.py   # SQLite operations
│   └── processor.py  # File reading & text chunking
├── data/
│   └── sample.txt    # Sample text file
└── text_search.db    # Database (created after load)
```

## Design Notes
- **Chunking**: Splits text at sentence endings when within 300-500 word range
- **Database**: SQLite with timeout handling
- **File Support**: Both .txt and .docx files

## AI Tool Usage
Claude AI was used to assist with code structure and implementation.
