import mongoose, { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Skill extends Document {
  name: string;
}

export const skillSchema = new Schema<Skill>(
  {
    name: { type: String, unique: true },
  },
  {
    versionKey: false,
  }
);
skillSchema.plugin(paginate);

export interface InstitutionDocumentSkill extends mongoose.Document, Skill {}

export const SkillModel = model<
  InstitutionDocumentSkill,
  mongoose.PaginateModel<InstitutionDocumentSkill>
>("skills", skillSchema);
