import { Schema, model } from 'mongoose'

const CategoriaSchema = new Schema({
  nombreCategoria: {
    type: String,
    required: true,
    trim: true
  },
  cobrosIndirectos: {
    seguro: {
      type: Number,
      trim: true,
      default: 0
    },

    donaciones: {
      type: Number,
      trim: true,
      default: 0
    }
  },
  requisitos: String
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Categoria', CategoriaSchema)