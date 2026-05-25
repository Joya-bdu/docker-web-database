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

    app.get("/", async (req, res) => {

      const collection = db.collection("visits");

      const count = await collection.countDocuments();

      const message = `Total Visits: ${count + 1}`;

      await collection.insertOne({
        visits: count + 1,
        time: new Date()
      });

      res.send(`
        <!DOCTYPE html>

        <html lang="en">

        <head>

          <meta charset="UTF-8">

          <meta name="viewport" content="width=device-width, initial-scale=1.0">

          <title>Dockerized Web App</title>

          <style>

            *{
              margin:0;
              padding:0;
              box-sizing:border-box;
            }

            body{
              font-family: Arial, sans-serif;
              height:100vh;
              background: linear-gradient(135deg,#141e30,#243b55);
              display:flex;
              justify-content:center;
              align-items:center;
              color:white;
            }

            .container{
              background: rgba(255,255,255,0.1);
              backdrop-filter: blur(10px);
              padding:50px;
              border-radius:20px;
              text-align:center;
              width:420px;
              box-shadow:0 8px 25px rgba(0,0,0,0.3);
            }

            h1{
              font-size:40px;
              margin-bottom:20px;
            }

            .visit-box{
              margin-top:25px;
              padding:20px;
              border-radius:12px;
              background:white;
              color:#222;
              font-size:28px;
              font-weight:bold;
            }

            .info{
              margin-top:20px;
              line-height:1.8;
              color:#ddd;
            }

            .footer{
              margin-top:30px;
              font-size:14px;
              color:#bbb;
            }

            .badge{
              display:inline-block;
              margin-top:15px;
              background:#00c853;
              color:white;
              padding:8px 16px;
              border-radius:30px;
              font-size:14px;
            }

          </style>

        </head>

        <body>

          <div class="container">

            <h1>🚀 Docker App</h1>

            <div class="badge">
              Multi-Container Architecture
            </div>

            <div class="visit-box">
              ${message}
            </div>

            <div class="info">
              <p>✅ Node.js Web Service</p>
              <p>✅ MongoDB Database Service</p>
              <p>✅ Docker Compose Enabled</p>
              <p>✅ Persistent Storage Active</p>
            </div>

            <div class="footer">
              Powered by Docker + MongoDB + Express
            </div>

          </div>

        </body>

        </html>
      `);

    });

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });

  } catch (err) {

    console.log("MongoDB connection error:", err);

  }

}

startServer();