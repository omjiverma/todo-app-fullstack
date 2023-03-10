const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;

mongoose.set("strictQuery", true);

async function mongoConnect() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connection established successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB: ", error);
  }
}

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready.");
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error: ", error);
});

module.exports = mongoConnect;