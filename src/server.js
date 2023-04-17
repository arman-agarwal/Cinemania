import http  from 'http';
import fs  from 'fs';

const server = http.createServer((req, res) => {
  // Handle only GET requests
  if (req.method === 'GET') {
    // Serve the requested JSON file
    if (req.url === '/your_file.json') {
      fs.readFile('./your_file.json', (err, data) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Internal Server Error');
          console.error('Error serving JSON file:', err);
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(data);
        }
      });
    } else {
      // Return a 404 Not Found error for any other GET requests
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('404 Not Found');
    }
  } else {
    // Return a 405 Method Not Allowed error for any non-GET requests
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('405 Method Not Allowed');
  }
});

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
