import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log("No MONGO url found.");
      process.exit(1);
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connnected:", conn.connection.host);
  } catch (error) {
    console.log("Error connecting to db :", error);
    process.exit(1);
  }
};
