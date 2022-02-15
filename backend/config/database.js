const mongooes = require("mongoose");

// Connection with MongoDB
const connectDatabase = () => {
  mongooes.connect(process.env.DB_URI, {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      // callback function
      console.log(`MongoDB connected with server ${data.connection.host}`);
    })
};

module.exports = connectDatabase;
