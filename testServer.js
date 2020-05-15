const mongoose = require("mongoose");
const http = require("http");

//const hostname = "127.0.0.1";
const hostname = "0.0.0.0";
//const port = 3000;
const port = 8080;
var connOK = false;
var connStatus = "";

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  mongoose
    .connect("mongodb://172.30.165.24:27017/tours", {
      //    .connect("mongodb://127.0.0.1:27017/tours", {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => {
      connOK = true;
      mongoose.connection.useDb("tours");
      mongoose.connection.collection("tours").insertOne({
        name: "Inserting",
        date: new Date(),
      });
      if (connOK) {
        connStatus = "DB connection successful !!!";
      } else connStatus = "Connection Error!";
      res.end("Hello World!!!! " + "Montevideo - " + "URUGUAY " + connStatus);
    });

  if (!connOK) res.end("Not ready yet !!!");
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
