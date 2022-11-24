const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.pwqsejd.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    const categoriesProductsCollection = client
      .db("categoryProducts")
      .collection("category");

    //   All categories
    app.get("/categories", async (req, res) => {
      const query = {};
      const result = await categoriesProductsCollection.find(query).toArray();
      res.send(result);
    });

    // Categories Products id get
    app.get("/categories/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await categoriesProductsCollection.findOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("Final Project Server Is Running");
});

app.listen(port, () => {
  console.log(`Final Project Runnin on ${port}`);
});
