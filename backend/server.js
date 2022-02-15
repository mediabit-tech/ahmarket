const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');

// Handling Uncaught Exception
process.on('uncaughtException', (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
})

// Config.env connect with PORT
dotenv.config({ path: 'backend/config/config.env' });

// Always connect DB after config the path of PORT otherwise DB cannot found process.env environment
// Connecting to database
connectDatabase();

// Create variable for PORT, which hidden by config.env file 
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
})

// Unhandled Promise Rejection
process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});