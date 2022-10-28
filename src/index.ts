import express from "express";
import mongoose from "mongoose";
import { Person, PersonModel } from "./models/Person";
import cors from "cors";
import persons from "./routes/persons";
import teams from "./routes/teams";
import bodyParser from "body-parser";
import { TeamsModel } from "./models/Teams";

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
  process.env.MONGODB_URI || "mongodb://localhost:27017/paradigma",
  (err) => {
    console.log(!err ? "Succefully connection" : "Db error");
  }
);

app.use("/persons", persons);
app.use("/teams", teams);

app.get("/s", async (req, res) => {
  const t = await TeamsModel.find({}).populate("persons");
  res.json({ message: t });
});
app.get("/sss", async (req, res) => {
  const filters = [
    {
      $lookup: {
        from: "peoples",
        localField: "persons.person",
        foreignField: "_id",
        as: "persons",
      },
    },
    // {
    //     '$unwind': {
    //       'path': '$person'
    //      }
    // },
    {
      $match: {
        "persons.person._id": { $ne: "6353f42f14062dc67ccfac70" },
      },
    },
  ];
  const t = await TeamsModel.aggregate(filters);
  return res.json({ test: t });
});
// const result = PersonModel.insertMany([{name: "ciao", surname: "prova", email: "email", skills: ["prova"], sector: "Frontend"}]);

app.get("/", async (req, res) => {
  const t = await PersonModel.find({ name: "ciao" });
  res.json({ message: t });
});
app.get("/test", async (req, res) => {
  res.json({ message: "ok" });
});

app.listen(port, () => console.log("Server is running"));

export default app;
