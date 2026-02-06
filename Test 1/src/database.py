import sqlite3

# Database manager for storing and searching text chunks
class DatabaseManager:
    def __init__(self, db_path="text_search.db"):
        self.db_path = db_path
        self.init_db()

    def get_connection(self):
        # Use timeout to wait for lock release
        conn = sqlite3.connect(self.db_path, timeout=10)
        return conn

    # Create chunks table if not exists
    def init_db(self):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS chunks (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    filename TEXT NOT NULL,
                    chunk_index INTEGER NOT NULL,
                    content TEXT NOT NULL,
                    word_count INTEGER NOT NULL
                )
            ''')
            conn.commit()

    # Insert a chunk into database
    def save_chunk(self, filename, chunk_index, content, word_count):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                INSERT INTO chunks (filename, chunk_index, content, word_count)
                VALUES (?, ?, ?, ?)
            ''', (filename, chunk_index, content, word_count))
            conn.commit()

    # Search chunks by keyword (case-insensitive)
    def search_by_keyword(self, keyword):
        with self.get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute('''
                SELECT filename, id, content, word_count
                FROM chunks
                WHERE content LIKE ?
            ''', (f"%{keyword}%",))
            return cursor.fetchall()
