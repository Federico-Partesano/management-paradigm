import mongoose, { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { BusinessUnit } from "./BusinessUnit";
import { Position } from "./Position";

export interface Person<T extends Position | string = Position, K extends BusinessUnit | string = BusinessUnit> extends Document {
  name: string;
  surname: string;
  email: string;
  skills: string[];
  positions: T[];
  businessUnit: K;
  workLoad: number;
  PO: boolean;
  SM: boolean;
  isActive: boolean;
  createdAt: number;
  updateAt: number;
}

export const personSchema = new Schema<Person>(
  {
    name: String,
    surname: String,
    email: { type: String, unique: true },
    businessUnit: { type: Schema.Types.ObjectId, ref: "businessunits" },
    skills: [{ type: Schema.Types.ObjectId, ref: "skills" }],
    positions: [{ type: Schema.Types.ObjectId, ref: "positions" }],
    workLoad: Number,
    PO: Boolean,
    SM: Boolean,
    isActive: Boolean
  },
  {
    versionKey: false,
    timestamps: true
  }
);
personSchema.plugin(paginate);

export interface InstitutionDocumentPerson extends mongoose.Document, Person {}

export const PersonModel = model<
  InstitutionDocumentPerson,
  mongoose.PaginateModel<InstitutionDocumentPerson>
>("peoples", personSchema);
