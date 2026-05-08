const express = require("express");
const { MongoClient } = require("mongodb");

const app = express();
const port = 3000;

const url = "mongodb://mongo:27017";
const client = new MongoClient(url);

async function startServer() {
  try {
    await client.connect();

    console.log("Connected to MongoDB");

    const db = client.db("dockerdb");
    const collection = db.collection("visits");

    app.get("/", async (req, res) => {
      await collection.insertOne({
        time: new Date()
      });

      const count = await collection.countDocuments();

      res.send(`Hello Docker! Total Visits: ${count}`);
    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {
    console.log("MongoDB connection error:", err);
  }
}

startServer();