import { MongoClient } from "mongodb";
import mongoose from "mongoose";

const uri = process.env.MONGO_URI as string;

const mongoClient = new MongoClient(uri);

export const db = mongoClient.db();
