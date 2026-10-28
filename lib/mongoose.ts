import mongoose from "mongoose";

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) {
    // Make queries fail immediately instead of buffering for 10s waiting for a connection that never comes.
    mongoose.set("bufferCommands", false);
    return console.log("Missing MongoDB URL");
  }
  // Callers don't await connectToDB(), so queries must buffer until the connection is up.
  mongoose.set("bufferCommands", true);

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL);

    isConnected = true; // Set the connection status to true
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
