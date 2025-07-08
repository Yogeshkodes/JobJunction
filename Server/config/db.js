import mongoose from "mongoose";

async function connectDB() {
  try {
    mongoose.connection.on("connected", () =>
      console.log("Database connected")
    );
    await mongoose.connect(`${process.env.MONGODB_URL}/job-junction`);
    console.log("connected to db");
  } catch (error) {
    console.error("connection error:", error);
  }
}

export default connectDB;
