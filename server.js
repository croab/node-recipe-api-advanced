// Imports
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
// Import app
const app = require('./app');

// Create DB
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// Connect to mongoose
mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});