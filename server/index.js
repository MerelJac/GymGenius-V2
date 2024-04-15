import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import mongodb from "mongodb";
import mongoose, { connect } from "mongoose";

const app = express()
const fetch = require('node-fetch');

const config = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    redirectUrl: process.env.REDIRECT_URL,
    clientUrl: process.env.CLIENT_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: 36000,
    postUrl: "https://jsonplaceholder.typicode.com/posts",
  };

app.use(
    cors({
      origin: [config.clientUrl],
      credentials: true,
    })
  );
// Parse Cookie
app.use(cookieParser());
// Middleware
app.use(express.json())

app.post('/api/auth/google', (req, res) => {
  const { code } = req.body;
  const client_id = 'YOUR_CLIENT_ID';
  const client_secret = 'YOUR_CLIENT_SECRET';
  const redirect_uri = 'YOUR_REDIRECT_URI';
  const grant_type = 'authorization_code';

  fetch('<https://oauth2.googleapis.com/token>', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      code,
      client_id,
      client_secret,
      redirect_uri,
      grant_type,
    }),
  })
  .then(response => response.json())
  .then(tokens => {
    // Send the tokens back to the frontend, or store them securely and create a session
    res.json(tokens);
  })
  .catch(error => {
    // Handle errors in the token exchange
    console.error('Token exchange error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  });
});

const connectToMongoDB = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
    } catch (err) {
      console.error('Error connecting to MongoDB:', err);
      throw err;
    }
  };

connectToMongoDB()
  .then(() => {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => console.log(`🚀 Server listening on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Error starting the server:", err);
  });
