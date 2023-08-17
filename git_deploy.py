from http.server import BaseHTTPRequestHandler, HTTPServer
import pandas as pd
from datetime import datetime
from build import BuildWebpage
import os
import shutil

class WebhookHandler(BaseHTTPRequestHandler):
    UPLOAD_DIRECTORY = "uploads"  # Directory to store uploaded files

    def do_POST(self):
        try:
            if self.path == "/webhook":
                print('frontend')
                self.frontend_update()
            elif self.path == "/backend":
                print('backend')
                self.backend_update()
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b'Not found')
        except BrokenPipeError:
            pass

    def frontend_update(self):
        # Process the webhook payload and initiate the deployment process
        webpage_build = BuildWebpage()
        webpage_build.run()

        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Webhook received successfully')

    def backend_update(self):
        # Code to update backend repository here
        backend_update = BuildWebpage()
        backend_update.backend_update()
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Webpage updated successfully')

def run(server_class=HTTPServer, handler_class=WebhookHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting webhook server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run(port=5000)