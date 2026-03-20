import { MongoClient } from "mongodb";

const connectionString = process.env.ATLAS_URI || "";
const client = new MongoClient(connectionString);

let conn;
try {
  conn = await client.connect();
} catch (e) {
  console.error(e);

  // We want the app to be working even if
  // there is no connection to the db
  // process.exit(1);
}

let db = conn.db("myDatabase");

export default db;
