import { Schema, model } from 'mongoose'

const InstitucionSchema = new Schema({
  nombreInstitucion: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true,
    trim: true
  },
  color: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Institucion', InstitucionSchema)