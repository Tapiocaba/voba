from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse
import json

from api.dependencies.dependencies import get_sentence_options

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse query parameters
        query_components = parse_qs(urlparse(self.path).query)
        story = query_components.get('story', [None])[0]
        vocab_list = query_components.get('vocab_list', [None])[0]
        mode = query_components.get('mode', [None])[0]

        if mode not in ["creative", "test", "mixed", ""] or story is None or vocab_list is None:
            self.send_response(400)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"detail": "Error: Invalid mode provided or missing parameters"}).encode())
            return

        try:
            sentence_options = get_sentence_options(story=story, vocab_list=vocab_list, mode=mode)
            formatted_sentences = {}

            if mode == "test":
                for option, text in sentence_options.items():
                    formatted_sentences[option] = {
                        "text": text,
                        "isCorrect": True if option == "option1" else False
                    }
            elif mode == "creative":
                for option, text in sentence_options.items():
                    formatted_sentences[option] = {
                        "text": text,
                        "isCorrect": True
                    }
            else:  # mixed or any other mode
                for option, text in sentence_options.items():
                    formatted_sentences[option] = {
                        "text": text,
                        "isCorrect": True if option == "option1" or option == "option2" else False
                    }

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(formatted_sentences).encode())

        except ValueError as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"detail": "Error: Incorrect JSON format."}).encode())
