import * as http from 'http';
import * as url from 'url';
import { readFile, writeFile } from 'fs/promises';

let data = {};
const JSONfile = 'data.json';

// NOTE: We changed the content type from text/html to application/json.
const headerFields = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, DELETE, HEAD, OPTIONS, PUT, POST",'Content-Type': 'application/json' };

async function reload(filename) {
  try {
    const input = await readFile(filename, { encoding: 'utf8' });
    data = JSON.parse(input);
  } catch (err) {
    data = {};
  }
}
await reload(JSONfile);

async function readAllMovies(response) {
    response.writeHead(200, headerFields);
    response.write(JSON.stringify(data));
    response.end();
}

async function basicServer(request, response) {
  const parsedURL = url.parse(request.url, true);
  const options = parsedURL.query;
  const pathname = parsedURL.pathname;
  const method = request.method;

  if (method === "OPTIONS") {
    response.writeHead(200, headerFields);
    response.end();
  } else if (method == 'GET' && pathname.startsWith('/getAllMovies')) {
    await readAllMovies(response);
  }else {
    response.writeHead(404, headerFields);
    response.write(JSON.stringify({ error: 'Not Found' }));
    response.end();
  }
}

// Start the server on port 3000.
http.createServer(basicServer).listen(3000, () => {
  console.log('Server started on port 3000');
});