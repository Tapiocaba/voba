from http.server import HTTPServer, BaseHTTPRequestHandler
import os

# Import your handler functions here
from get_story_continue import handler as story_continue_handler
from get_initial_story import handler as initial_story_handler
from get_audio import handler as audio_handler
from explain_why_wrong import handler as explain_wrong_handler
from get_sentence_options import handler as sentence_options_handler

class LocalTestServer(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith("/api/get_story_continue"):
            story_continue_handler(self)
        elif self.path.startswith("/api/get_initial_story"):
            initial_story_handler(self)
        elif self.path.startswith("/api/get_audio"):
            audio_handler(self)
        elif self.path.startswith("/api/explain_wrong"):
            explain_wrong_handler(self)
        elif self.path.startswith("/api/get_sentence_options"):
            sentence_options_handler(self)
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"404 Not Found: Endpoint not found")

if __name__ == "__main__":
    port = 8000
    server_address = ('', port)
    httpd = HTTPServer(server_address, LocalTestServer)
    print(f"Running local server on port {port}...")
    httpd.serve_forever()
