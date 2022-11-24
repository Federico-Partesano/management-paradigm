import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import persons from "./routes/personsRoute";
import teams from "./routes/teamsRoute";
import skills from "./routes/skillsRoute";
import businessUnit from "./routes/businessUnitRoute";
import positions from "./routes/positionsRoute";
import bodyParser from "body-parser";
import { MongooseQueryParser } from 'mongoose-query-parser';
import { PersonModel } from "./models/Person";
import { simulateLazy } from "./middlewares/simulateLazy";

const port = process.env.PORT || 3005;
export const parser = new MongooseQueryParser();

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
  "mongodb://localhost:27017/paradigma",
  (err) => {
    console.log(!err ? "Succefully connection" : "Db error");
  }
);

app.use(simulateLazy)

app.use("/persons", persons);
app.use("/projects", teams);
app.use("/skills", skills);
app.use("/businessunits", businessUnit);
app.use("/positions", positions);

app.get("/test", async (req, res) => {
  const t = await PersonModel.find();
  t.map((person) =>{
    (person.businessUnit as any) = "636ce3731cb2b2f192223b08";
    person.save();
  })
  res.json({ message: "ok" });
});


app.listen(port, () => console.log("Server is running"));

export default app;
