const fs = require("fs");
const express = require("express");

let app = express();
const port = 3000;
let src = "./static/7-years.mp3";
let mimetype = "audio/mpeg";
// let src = "./static/1.png";
// let mimetype = "image/png; charset=utf-8";

app.get("/", (req, res) => {
  res.send('<h2>hello world</h2><audio src="" controls></audio>');
});

app.get("/music", (req, res) => {
  fs.readFile(src, (err, file) => {
    if (err) {
      throw err;
    }
    res.set({
      "Content-Type": mimetype
    });
    res.send(file);
  });
});

app.listen(port, () => {
  console.log(`you are listening at port ${port}`);
});
