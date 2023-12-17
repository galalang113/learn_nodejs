// getting-started.js
const mongoose = require("mongoose");

async function connectMongo() {
  return mongoose
    .connect("mongodb://127.0.0.1:27017/demo_mongoose")
    .then(() => console.log("Connect mongo successfully!!!"))
    .catch((err) => console.log("Connect mongo fail!!!", err));
}

module.exports = { connectMongo };
