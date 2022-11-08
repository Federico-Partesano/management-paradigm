import mongoose, { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Sector } from "./Sector";

export interface Person extends Document {
  name: string;
  surname: string;
  email: string;
  skills: string[];
  sector: Sector;
  workLoad: number;
}

export const personSchema = new Schema<Person>(
  {
    name: String,
    surname: String,
    email: { type: String, unique: true },
    skills: [{ type: Schema.Types.ObjectId, ref: "skills" }],
    sector: { type: Schema.Types.ObjectId, ref: "sectors" },
    workLoad: Number,
  },
  {
    versionKey: false,
  }
);
personSchema.plugin(paginate);

interface InstitutionDocument extends mongoose.Document, Person {}

export const PersonModel = model<
  InstitutionDocument,
  mongoose.PaginateModel<InstitutionDocument>
>("peoples", personSchema);
