"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongodb_1 = require("mongodb");
const uri = process.env.MONGO_URI;
const mongoClient = new mongodb_1.MongoClient(uri);
exports.db = mongoClient.db();
