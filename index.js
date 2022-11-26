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
    const categoriesCollection = client
      .db("finalProjectDB")
      .collection("laptopCategories");
    const productsCollection = client
      .db("finalProjectDB")
      .collection("laptopProducts");
    const bookingCollection = client
      .db("finalProjectDB")
      .collection("bookingProducts");
    const usersCollection = client.db("finalProjectDB").collection("users");

    // laptop all category
    app.get("/category", async (req, res) => {
      const query = {};
      const result = await categoriesCollection.find(query).toArray();
      res.send(result);
    });

    // categories products get
    app.get("/category/:id", async (req, res) => {
      const id = req.params.id;
      const query = { category_id: id };
      const products = await productsCollection.find(query).toArray();
      res.send(products);
    });

    // User Booking Product insert database
    app.post("/bookings", async (req, res) => {
      const booking = req.body;
      const product = await bookingCollection.insertOne(booking);
      res.send(product);
    });

    app.get("/bookings", async (req, res) => {
      const email = req.query.email;
      const query = { userEmail: email };
      const bookings = await bookingCollection.find(query).toArray();
      res.send(bookings);
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
