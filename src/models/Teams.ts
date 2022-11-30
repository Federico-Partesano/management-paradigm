import mongoose, { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { ContractType } from "./ContractType";
import { Person } from "./Person";

export interface PostTeam {
  person: string;
  contractType: string;
}
interface PersonTeam {
  person: Person;
  contractType: ContractType;
}
export interface Team<T extends PersonTeam | PostTeam = PersonTeam>
  extends Document {
  name: string;
  description: string;
  persons: T[];
  startDate: number;
  endDate: number | null;
  PO: string | null;
  SM: string | null;
  isActive: boolean;
  createdAt: number;
}

const personTeam = new Schema<{
  person: Schema.Types.ObjectId;
  contractType: ContractType;
}>(
  {
    person: { type: Schema.Types.ObjectId, ref: "peoples" },
    contractType: String,
  },
  { _id: false }
);

const teamSchema = new Schema<Team>(
  {
    name: String,
    description: String,
    persons: [personTeam],
    PO: { type: Schema.Types.ObjectId, ref: "peoples" },
    SM: { type: Schema.Types.ObjectId, ref: "peoples" },
    startDate: Number,
    endDate: Number,
    isActive: Boolean,
  },
  {
    versionKey: false,
    timestamps: true
  }
);
teamSchema.plugin(paginate);

export interface InstitutionDocumentTeam extends mongoose.Document, Team {}

export const TeamsModel = model<
  InstitutionDocumentTeam,
  mongoose.PaginateModel<InstitutionDocumentTeam>
>("projects", teamSchema);
