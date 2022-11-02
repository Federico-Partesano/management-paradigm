import mongoose, { Schema, model, Document } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { ContractType } from "./ContractType";
import { Person, PersonModel, personSchema } from "./Person";
import { Sector } from "./Sector";

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
    startDate: Number,
    endDate: Number,
  },
  {
    versionKey: false,
  }
);
teamSchema.plugin(paginate);

export interface InstitutionDocument extends mongoose.Document, Team {}

export const TeamsModel = model<
  InstitutionDocument,
  mongoose.PaginateModel<InstitutionDocument>
>("projects", teamSchema);
