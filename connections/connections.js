import mongoose from "mongoose";

async function ConnectMongoDb(url) {
  return await mongoose.connect(url);
}

export { ConnectMongoDb };
