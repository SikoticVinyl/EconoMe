require('dotenv').config({ path: '../.env' });
const express = require('express');
const helmet = require('helmet'); //a middleware that adds various security headers to protect the app from some web vulnerabilities
const cors = require('cors'); //(Cross-Origin Resource Sharing) to allow or restrict requested resources on a web server based on where the HTTP request was initiated
const rateLimit = require('express-rate-limit'); // limit repeated requests to public APIs and/or endpoints
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes'); //contains our authentication routes

const app = express();

app.use(helmet());
app.use(cors());
// Global rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use(limiter);

app.use(express.json());

app.use('/api/users', authRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});