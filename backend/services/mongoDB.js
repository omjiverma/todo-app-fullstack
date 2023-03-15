const mongoose = require("mongoose");

// get MONGO_URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

// enable strict mode for queries
mongoose.set("strictQuery", true);

// async function to connect to MongoDB
async function mongoConnect() {
  try {
    // connect to MongoDB using MONGO_URI and options
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // log successful connection
    console.log("MongoDB connection established successfully.");
  } catch (error) {
    // log error if connection failed
    console.error("Error connecting to MongoDB: ", error);
  }
}

// log when MongoDB connection is ready
mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready.");
});

// log MongoDB connection errors
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error: ", error);
});

// export mongoConnect function
module.exports = mongoConnect;