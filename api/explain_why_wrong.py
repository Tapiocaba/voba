from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
from api.helpers.helpers import explain_why_wrong

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query_components = parse_qs(urlparse(self.path).query)
        sentence = query_components.get('sentence', [None])[0]
        word = query_components.get('word', [None])[0]
        
        if sentence and word:
            # Simulate the explanation logic
            
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            explanation = explain_why_wrong(sentence=sentence, word=word)
            for chunk in explanation:
                self.wfile.write(chunk.encode())
                self.wfile.flush()

        else:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write('{"detail": "Missing sentence or word parameter"}'.encode())

# Note: Adjust the import statement and uncomment the actual logic as per your setup
