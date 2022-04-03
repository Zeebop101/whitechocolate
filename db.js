const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("going");
  try {
    const conn = await mongoose.connect(proccess.env.MONGO_DB);
    console.log(`MONGODB CONNECTED: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
