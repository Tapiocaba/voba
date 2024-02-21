from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
from api.helpers.helpers import get_story_start  # Ensure this path is correct based on your project structure

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query_components = parse_qs(urlparse(self.path).query)
        vocab_list = query_components.get('vocab_list', [None])[0]
        mode = query_components.get('mode', [None])[0]
        
        # Validate and process the request
        if mode in ["creative", "test", "mixed"] and vocab_list is not None:
            story = get_story_start(vocab_list=vocab_list, mode=mode)
            
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(story.encode())
        else:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write('{"detail": "Error: Invalid mode provided or missing vocab_list"}'.encode())