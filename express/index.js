const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3001;

app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

// Add this line to serve our index.html page
app.use(express.static('../src/index.html'));

app.get('/', (req, res) => {
    res.send("Server Online");
});

app.post('/upload', (req, res) => {
    console.log("Got something");
    const { image } = req.files;
  
    if (!image) {
      return res.status(400).send('No image uploaded');
    }
  
    const allowedTypes = /^image\/(jpeg|png|gif)$/;
  
    if (!allowedTypes.test(image.mimetype)) {
      return res.status(400).send('Invalid image type');
    }
  
    image.mv(__dirname + '/../src/movieImages/' + image.name, function(err) {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
  
      console.log('Image uploaded successfully');
      return res.sendStatus(200);
    });
  });
  

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});