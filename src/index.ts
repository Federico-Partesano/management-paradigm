import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import persons from "./routes/persons";
import teams from "./routes/teams";
import skills from "./routes/skills";
import sectors from "./routes/sectors";
import bodyParser from "body-parser";

const port = process.env.PORT || 3005;

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors() as any);

mongoose.connect(
  process.env.MONGDB_URI || "mongodb://localhost:27017/paradigma",
  (err) => {
    console.log(!err ? "Succefully connection" : "Db error");
  }
);

app.use("/persons", persons);
app.use("/teams", teams);
app.use("/skills", skills);
app.use("/sectors", sectors);

app.get("/test", async (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => console.log("Server is running"));

export default app;
