const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

mongoose.set("strictQuery", true);

async function startDatabase() {
  const mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();

  mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    dbName: "tweets",
    useUnifiedTopology: true,
  });

  console.info(`Successfully connected to the database`);
}

async function stopDatabase() {
  await mongoose.disconnect();
}

module.exports = {
  startDatabase,
  stopDatabase,
};
