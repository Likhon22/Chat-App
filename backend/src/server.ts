import config from "./app/config";
import mongoose from "mongoose";
import { server } from "./app/lib/socket";

const connectDB = async () => {
  try {
    await mongoose.connect(config.db_url as string);

    server.listen(config.port, () => {
      console.log(
        `Example app listening at ${config.port} and connected to MongoDB`,
      );
    });
  } catch (err) {
    console.log(err);
  }
};

connectDB();
