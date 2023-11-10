import { Schema, model } from "mongoose";

const SubcategoriaSchema = new Schema(
  {
    nombreSubcategoria: {
      type: String,
      required: true,
    },
    tasaInteres: {
      type: Number,
      required: true,
      trim: true,
    },
    plazoMaximo: {
      type: Number,
      required: true,
      trim: true,
    },
    montoMinimo: {
      type: Number,
      required: true,
      trim: true,
    },
    montoMaximo: {
      type: Number,
      required: true,
      trim: true,
    },
    idCategoria: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Subcategoria", SubcategoriaSchema);
