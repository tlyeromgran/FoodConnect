// Local MongoDB for development: `npm run db` (leave it running alongside `npm run dev`).
// mongodb-memory-server downloads a mongod binary on first run (cached afterwards).
// Data is kept in .mongo-data/ so it survives restarts; delete that folder to start fresh.
import { mkdirSync } from "node:fs";
import { MongoMemoryServer } from "mongodb-memory-server";

const dbPath = new URL("../.mongo-data/", import.meta.url);
mkdirSync(dbPath, { recursive: true });

const server = await MongoMemoryServer.create({
  // Mongoose 7 / driver 5.x supports MongoDB up to 7.0.
  binary: { version: "7.0.14" },
  instance: {
    port: 27017,
    dbPath: decodeURIComponent(dbPath.pathname).replace(/^\/([A-Za-z]:)/, "$1"),
    storageEngine: "wiredTiger",
  },
});

console.log(`MongoDB running at ${server.getUri()}`);
console.log("MONGODB_URL=mongodb://127.0.0.1:27017/foodconnect");

const shutdown = async () => {
  await server.stop({ doCleanup: false });
  process.exit(0);
};
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
