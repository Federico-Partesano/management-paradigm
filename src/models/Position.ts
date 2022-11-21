import mongoose, { model, Schema } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { BusinessUnit } from "./BusinessUnit";

export interface Position<T extends BusinessUnit | string = BusinessUnit>
  extends Document {
  name: string;
  businessUnit: T;
}

export const positionSchema = new Schema<Position>(
  {
    name: { type: String, unique: true },
    businessUnit: { type: Schema.Types.ObjectId, ref: "businessunits" },
  },
  {
    versionKey: false,
  }
);
positionSchema.plugin(paginate);

export interface InstitutionDocumentPosition<
  T extends BusinessUnit | string = BusinessUnit
> extends mongoose.Document,
    Position<T> {}

export const PositionModel = model<
  InstitutionDocumentPosition,
  mongoose.PaginateModel<InstitutionDocumentPosition>
>("positions", positionSchema);
