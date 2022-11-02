import mongoose, { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { Sector } from "./Sector";

export interface Skill extends Document {
  value: string
}

export const skillSchema = new Schema<Skill>(
  {
    value: String
  },
  {
    versionKey: false,
  }
);
skillSchema.plugin(paginate);

interface InstitutionDocument extends mongoose.Document, Skill {}

export const SkillModel = model<
  InstitutionDocument,
  mongoose.PaginateModel<InstitutionDocument>
>("skills", skillSchema);
