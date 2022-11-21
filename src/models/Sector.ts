import mongoose, { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";

export interface Sector extends Document {
  name: string;
}

export const sectorSchema = new Schema<Sector>(
  {
    name: { type: String, unique: true },
  },
  {
    versionKey: false,
  }
);
sectorSchema.plugin(paginate);

interface InstitutionDocument extends mongoose.Document, Sector {}

export const SectorModel = model<
  InstitutionDocument,
  mongoose.PaginateModel<InstitutionDocument>
>("sectors", sectorSchema);
