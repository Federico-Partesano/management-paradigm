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
import { TeamsModel } from "./models/Teams";

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
  process.env.MONGDB_URI || "mongodb://localhost:27017/paradigma",
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
  // const t = await TeamsModel.find();
  // t.map((team) =>{
  //   (team.isActive as any) = true;
  //   team.save();
  // })
  res.json({ message: "ok" });
});


app.listen(port, () => console.log("Server is running"));

export default app;
