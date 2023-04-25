import PouchDB from 'pouchdb';
import fs from 'fs';

let db = new PouchDB('movieStorage');
let a = {
    "_id": '1',
    "src": "movieImages/johnWick1.jpg",
    "name": "John Wick 1",
    "stars": 5,
    "comment_title": "Amazing",
    "comment": "Great movie 1"
};
db.put(a);
const db2 = new PouchDB('movieStorage');
let b = {
    "_id": '2',
    "src": "movieImages/johnWick2.jpg",
    "name": "John Wick 2",
    "stars": 4,
    "comment_title": "Awesome",
    "comment": "Great movie 2"
};
let c = {
    "_id": '3',
    "src": "movieImages/johnwick3.jpg",
    "name": "John Wick 3",
    "stars": 3,
    "comment_title": "Great",
    "comment": "Great movie 3"
};
let d = {
    "_id": '4',
    "src": "movieImages/blackPanther.jpeg",
    "name": "Black Panther",
    "stars": 2,
    "comment_title": "Could be Better",
    "comment": "Great movie 4"
};

db.put(b);
db2.put(c);
db2.put(d);
let results = [];
db.allDocs({
        include_docs: true, 
        attachments: true 
    }).then(function (result) {
        console.log(result.rows); 
    }).catch(function (err) {
        console.log(err);
    });