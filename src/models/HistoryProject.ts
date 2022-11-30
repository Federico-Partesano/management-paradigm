import mongoose, { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { ContractType } from "./ContractType";
import { Person } from "./Person";

export interface HistoryProject<T extends string | Person = Person> extends Document {
  idProject: String;
  createdAt: number,
  updateAt: number,
  persons: {
    person: T;
    contractType: ContractType;
    joinDate: number | null,
    stopDate: number | null,
  }
}


const personHistoryProject = new Schema<{
    person: Schema.Types.ObjectId;
    contractType: ContractType;
    joinDate: number | null,
    stopDate: number | null
  }>(
    {
      person: { type: Schema.Types.ObjectId, ref: "peoples" },
      contractType: String,
      joinDate: Number,
      stopDate: Number,
    },
    { _id: false }
  );

export const historyProjectSchema = new Schema<HistoryProject>(
  {
    idProject: { type: Schema.Types.ObjectId, ref: "projects" },
    persons: [personHistoryProject],
  },
  {
    versionKey: false,
    timestamps: true
  }
);

historyProjectSchema.plugin(paginate);

export interface InstitutionDocumentBusinessUnit
  extends mongoose.Document,
  HistoryProject {}

export const HistoryProjectModel = model<
  InstitutionDocumentBusinessUnit,
  mongoose.PaginateModel<InstitutionDocumentBusinessUnit>
>("historyprojects", historyProjectSchema);
