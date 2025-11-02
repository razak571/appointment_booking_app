import mongoose from "mongoose";

const mongoDBURI = process.env.MONGO_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(mongoDBURI);
    console.log("connected to database successfully");
  } catch (error) {
    await mongoose.disconnect();
    console.log("failed to connect database : : ", error.message);
  }
};
