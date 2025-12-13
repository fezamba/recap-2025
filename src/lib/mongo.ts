import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URL;
if (!uri) throw new Error("Missing env MONGO_URL");

let client: MongoClient | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (client) return client;
  client = new MongoClient(uri);
  await client.connect();
  return client;
}

export function getDbName(): string {
  return process.env.MONGO_DB_NAME || "retrospectiva";
}
