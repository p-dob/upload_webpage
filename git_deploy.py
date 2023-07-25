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
                self.handle_github_webhook()
            elif self.path == "/upload-files":
                self.handle_file_upload()
            else:
                self.send_response(404)
                self.end_headers()
                self.wfile.write(b'Not found')
        except BrokenPipeError:
            pass

    def handle_github_webhook(self):
        # Process the webhook payload and initiate the deployment process
        webpage_build = BuildWebpage()
        webpage_build.run()

        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'Webhook received successfully')

    def handle_file_upload(self):
        # Make sure the upload directory exists
        if not os.path.exists(self.UPLOAD_DIRECTORY):
            os.makedirs(self.UPLOAD_DIRECTORY)

        # Get the uploaded files from the request
        files = self.rfile.readlines()

        # Save the files to the upload directory
        for i, file in enumerate(files):
            filename = os.path.join(self.UPLOAD_DIRECTORY, f"file_{i}.txt")
            with open(filename, "wb") as f:
                f.write(file)

        self.send_response(200)
        self.end_headers()
        self.wfile.write(b'File upload successful')

def run(server_class=HTTPServer, handler_class=WebhookHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting webhook server on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run(port=5000)