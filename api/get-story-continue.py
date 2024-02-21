from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json

from api.dependencies.dependencies import get_story_continue

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query_components = parse_qs(urlparse(self.path).query)
        story = query_components.get('story', [None])[0]
        vocab_list = query_components.get('vocab_list', [None])[0]
        mode = query_components.get('mode', [None])[0]
        conclude_param = query_components.get('conclude', [None])[0]

        conclude = conclude_param.lower() == 'true' if conclude_param else False

        if mode not in ["creative", "test", "mixed"] or story is None or vocab_list is None:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"detail": "Error: Invalid mode provided or missing parameters"}).encode())
            return

        try:
            continued_story = get_story_continue(story=story, vocab_list=vocab_list, mode=mode, conclude=conclude)
            self.send_response(200)
            self.send_header('Content-type', 'text/plain')
            self.end_headers()
            self.wfile.write(continued_story.encode())
        except Exception as e:  # General exception handling, consider specifying exceptions
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"detail": "Server error occurred"}).encode())
