import os

# Read file content (supports .txt and .docx)
def read_file(filepath):
    if not os.path.exists(filepath):
        raise FileNotFoundError(f"File not found: {filepath}")
    
    ext = os.path.splitext(filepath)[1].lower()
    
    # Handle Word documents
    if ext == '.docx':
        from docx import Document
        doc = Document(filepath)
        return "\n".join([p.text for p in doc.paragraphs])
    
    # Handle plain text files
    else:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read()

# Split text into 300-500 word chunks
def chunk_text(text, target_min=300, target_max=500):
    words = text.split()
    chunks = []
    current_chunk = []
    current_count = 0
    
    for word in words:
        current_chunk.append(word)
        current_count += 1
        
        # Break at sentence end if within range
        if current_count >= target_min:
            if current_count < target_max:
                if word.endswith(('.', '!', '?')):
                    chunks.append(" ".join(current_chunk))
                    current_chunk = []
                    current_count = 0
            else:
                # Force break at max limit
                chunks.append(" ".join(current_chunk))
                current_chunk = []
                current_count = 0
    
    # Add remaining words
    if current_chunk:
        chunks.append(" ".join(current_chunk))
        
    return chunks
