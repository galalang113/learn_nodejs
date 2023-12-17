const express = require("express");
const path = require("path");
const multer = require("multer");
const bodyParser = require('body-parser')
const { connectMongo } = require("./database/database");
const Product = require("./model/product");

async function Main() {
  const app = express();
  const port = 3000;

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage: storage });

  // connect mongoose
  await connectMongo();

  // Tạo sản phẩm
  // const product = new Product({ name: "fluffy" });
  // await product.save();

  // console.log("find", await Product.find({ name: "fluffy" }));
  // console.log("findOne", await Product.findOne({ name: "fluffy" }));
  // console.log("findOneAndUpdate", await Product.findOneAndUpdate({ name: "fluffy" }, { $set: { name: "fluffy 1" } } , { new : true }));
  // console.log("findOneAndUpdate: upsert", await Product.findOneAndUpdate({ name: "fluffy" }, { $set: { name: "fluffy 1" } } , { new : true , upsert: true}));
  // console.log("deleteOne", await Product.deleteOne({ name: "fluffy 1" }));
  // console.log("deleteMany", await Product.deleteMany({ name: "fluffy 1" }));


  app.use(express.static("public"));
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.post("/profile", upload.single("avatar"), function (req, res, next) {
    console.log(req.file);
    res.json({
      message: "Upload file success",
    });
  });

 

  app.get("/", (req, res) => {
    res.sendFile(path.resolve("./views/index.html"));
  });

  app.get("/file2", (req, res) => {
    res.sendFile(path.resolve("./views/index2.html"));
  });

  app.get("/json", (req, res) => {
    res.json({
      ok: true,
    });
  });

  app.get("/status", (req, res) => {
    res.status(401).json({
      message: "Không có quyên truy cập",
    });
  });

  app.get("/upfile", (req, res) => {
    res.sendFile(path.resolve("./views/uploadFile.html"));
  });

  app.get("/api/products", async (req, res) => {
    let product = await Product.find({});
    res.status(200).json(product);
  });

  app.post("/api/products/create", async (req, res) => {
    let product = new Product({ name: "sản phẩm 1" });
    await product.save();
    res.status(200).json({ message: "create success!!!" });
  });

  app.put("/api/products/update/:product_id" , async (req, res) => {
    let product = await Product.findOneAndUpdate(
      { _id: req.params.product_id },
      { $set: req.body},
      { new: true, upsert: true }
    )
    res.status(200).json(product);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}
Main();
