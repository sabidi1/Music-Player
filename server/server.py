from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import socketserver
import sys

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        SimpleHTTPRequestHandler.end_headers(self)
if __name__ == '__main__':
        test(CORSRequestHandler, HTTPServer, port=8000)
    # PORT = 8000
    # Handler = http.server.SimpleHTTPRequestHandler
    # httpd = socketserver.TCPServer(("", PORT),Handler)
    # print("Server at PORT:", PORT)
    # httpd.serve_forever()