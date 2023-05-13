import * as http from 'http';
import * as url from 'url';
import PouchDB from 'pouchdb';
import { readFile, writeFile } from 'fs/promises';

let dbLen = 0;

let db = new PouchDB('movieStorage');

const headerFields = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "GET, DELETE, HEAD, OPTIONS, PUT, POST",'Content-Type': 'application/json' };

async function reload() {
  db.allDocs({
    include_docs: true, 
    attachments: true 
  }).then(function (result) {
    dbLen = result.rows.length;
  }).catch(function (err) {
    console.log(err);
  });
}

await reload();

async function readAllMovies(response) {
  db.allDocs({
    include_docs: true, 
    attachments: true 
  }).then(function (result) {
    console.log(result.rows);
    let data = [];
    for (let i = 0; i<result.rows.length; ++i){
      let temp = {
        "cardID":result.rows[i].id,
        "src":result.rows[i].doc.src,
        "name":result.rows[i].doc.name,
        "stars":result.rows[i].doc.stars,
        "comment_title":result.rows[i].doc.comment_title,
        "comment":result.rows[i].doc.comment
      };
      data.push(temp);
    }
    response.writeHead(200, headerFields);
    response.write(JSON.stringify(data));
    response.end();
  }).catch(function (err) {
    console.log(err);
  });
}

async function writeNewMovie(response, newData) {
    newData = JSON.parse(newData);
    let id = dbLen + 1;
    newData["_id"] = id.toString();
    dbLen = dbLen + 1;
    if(newData['stars']==undefined){
        newData['stars'] = 0;
    }
    db.put(newData);
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ success: true }));
    response.end();
}

async function updateMovie(response, movie){
  movie = JSON.parse(movie);
  console.log(movie);
  db.get(movie["cardID"]).then((doc)=>{
    if( movie["name"] != undefined){
      doc["name"] = movie.name;
    }
    if( movie["stars"] != undefined){
      doc["stars"] = movie.stars;
    }
    if( movie["comment_title"] != undefined){
      doc["comment_title"] = movie.comment_title;
    }
    if(movie["comment"] != undefined){
      doc["comment"] = movie.comment;
    }
    console.log(doc);
    return db.put(doc);
  }).then(function(response) {
    response.writeHead(200, headerFields);
    response.write(JSON.stringify({ success: true }));
    response.end();
  }).catch(function(error) {
    response.writeHead(400, headerFields);
    response.write(JSON.stringify({ success: false }));
    response.end();
  });
}

async function deleteMovie(response, cardID){
    db.get(cardID).then(function (doc) {
      return db.remove(doc);
    });
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
  } else if (method == 'PUT' && pathname.startsWith('/updateMovie')){
    await updateMovie(response, options.movie);
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