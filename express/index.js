const express = require('express');
const cors = require('cors');
const multer = require('multer')
// const fileUpload = require('express-fileupload');
const app = express();
const port = 3001;

// app.use(
//     fileUpload({
//         limits: {
//             fileSize: 10000000,
//         },
//         abortOnLimit: true,
//     })
// );

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `${__dirname}/../src/movieImages/`)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  });

app.use(cors());
const upload = multer({ storage: storage })

// Add this line to serve our index.html page
app.use(express.static('../src/index.html'));

app.get('/', (req, res) => {
    res.send("Server Online");
});

app.post('/upload', upload.single('file'), (req, res) => {
    const image = req.file;
  
    if (!image) {
      return res.status(400).send({error: 'No image uploaded'});
    }
  
    const allowedTypes = /^image\/(jpeg|png|gif)$/;
  
    if (!allowedTypes.test(image.mimetype)) {
      return res.status(400).send({error: 'Invalid image type'});
    }
  
    // image.mv(__dirname + '/../src/movieImages/' + image.name, function(err) {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).send(err);
    //   }
  
    //   console.log('Image uploaded successfully');
    //   return res.sendStatus(200);
    // });
    console.log('Image uploaded successfully');
    return res.status(200).send({srcPath: image.originalname});
  });
  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});