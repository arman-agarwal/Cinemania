import * as http from 'http';
import * as url from 'url';
import PouchDB from 'pouchdb';
import { readFile, writeFile } from 'fs/promises';

let data = {};
const JSONfile = 'data.json';

let db = new PouchDB('movieStorage');

const headerFields = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, DELETE, HEAD, OPTIONS, PUT, POST",'Content-Type': 'application/json' };

async function saveMovies() {
    try {
      const newData = JSON.stringify(data, null, 2);
      await writeFile(JSONfile, newData, { encoding: 'utf8' });
    } catch (err) {
      console.log(err);
    }
}

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
  // db.allDocs({
  //   include_docs: true, 
  //   attachments: true 
  // }).then(function (result) {
  //   response.writeHead(200, headerFields);
  //   response.write(JSON.stringify(result.rows));
  //   response.end();
  // }).catch(function (err) {
  //   console.log(err);
  // });
  response.writeHead(200, headerFields);
  response.write(JSON.stringify(data));
  response.end();
}

async function writeNewMovie(response, newData) {
    newData = JSON.parse(newData);
    newData["id"] = data.length + 1;
    if(newData['name']==undefined){
        newData['name'] = '';
    }
    if(newData['stars']==undefined){
        newData['stars'] = 0;
    }
    if(newData['comment_title']==undefined){
        newData['comment_title'] = '';
    }
    if(newData['comment']==undefined){
        newData['comment'] = '';
    }
    data.push(newData);
    await saveMovies();
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ success: true }));
    response.end();
}

// async function uploadImage(response, formData){
//     console.log(formData);
//     response.writeHead(200, headerFields);
//     response.write(JSON.stringify({ success: true }));
//     response.end();
// }

async function deleteMovie(response, cardID){
    cardID = parseInt(cardID);
    let index = data.findIndex(obj => obj.cardID === cardID);
    data.splice(index, 1);
    await saveMovies();
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ success: true }));
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
  } else if (method == 'POST' && pathname.startsWith('/writeMovie')){
    await writeNewMovie(response, options.movie);
  } else if (method == 'POST' && pathname.startsWith('/uploadPoster')){
    await uploadImage(response, options.formData);
  } else if (method == 'DELETE' && pathname.startsWith('/deleteMovie')){
    await deleteMovie(response, options.cardID);
  } else {
    response.writeHead(404, headerFields);
    response.write(JSON.stringify({ error: 'Not Found' }));
    response.end();
  }
}

// Start the server on port 3000.
http.createServer(basicServer).listen(3000, () => {
  console.log('Server started on port 3000');
});