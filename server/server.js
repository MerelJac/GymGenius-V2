import dotenv from 'dotenv';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

// Middleware
const app = express();
const PORT = '3001';
app.use(cors());
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  // Here, you would typically create or retrieve a user from your database
  // using the profile information provided by Google.
  return done(null, profile);
}));

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, create session or issue token
    // For example, you can set a cookie with user information
    console.log(req.user, 'user')
    res.cookie('user', JSON.stringify(req.user), { httpOnly: true, sameSite: 'strict' });
    // Redirect user to frontend
    res.redirect('http://localhost:3000');
  }
);

app.listen(3001, () => {
  console.log(`Server is running on port ${PORT}`);
});
