"use strict";
import { createServer, proxy } from "aws-serverless-express";
import { dbConnection } from "./src/database/dbConnection";
import app from "./src/index";
const binaryMimeTypes = ["application/octet-stream"];
const server = createServer(app, null, binaryMimeTypes);

let isConnected = false;
let connection = dbConnection();

export function handler(event, context, callback) {
  if (isConnected) {
    proxy(server, event, context);
  } else {
    connection
      .then(() => {
        isConnected = true;
        // Logger.info("Connected to database.");
        console.log("Connected to database.");
        proxy(server, event, context);
      })
      .catch((error) => {
        Logger.error(`Could not connect to database with error ${error}`)
        console.log("Connected to database.");
      }
      );
  }
}
