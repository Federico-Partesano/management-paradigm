import mongoose, { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface BusinessUnit extends Document {
  name: String;
}

export const businessUnitSchema = new Schema<BusinessUnit>(
  {
    name: { type: String, unique: true },
  },
  {
    versionKey: false,
  }
);

businessUnitSchema.plugin(paginate);

export interface InstitutionDocumentBusinessUnit
  extends mongoose.Document,
    BusinessUnit {}

export const BusinessUnitModel = model<
  InstitutionDocumentBusinessUnit,
  mongoose.PaginateModel<InstitutionDocumentBusinessUnit>
>("businessunits", businessUnitSchema);
const t: keyof InstitutionDocumentBusinessUnit = "name";
