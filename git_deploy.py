from http.server import BaseHTTPRequestHandler, HTTPServer
import pandas as pd
from datetime import datetime
from build import BuildWebpage
import os

class WebhookHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b'Webhook received successfully')
            content_length = int(self.headers['Content-Length'])
            payload = self.rfile.read(content_length).decode('utf-8')
            # Process the webhook payload and initiate the deployment process
            webpage_build = BuildWebpage()
            webpage_build.run()
        except BrokenPipeError:
            pass

def run(server_class=HTTPServer, handler_class=WebhookHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting webhook server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run(port=5000)