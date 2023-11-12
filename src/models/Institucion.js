import { Schema, model } from 'mongoose'

const InstitucionSchema = new Schema({
  nombreInstitucion: {
    type: String,
    required: true
  },
  logo: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  publicidad: {
    type: [String]
  }
}, {
  timestamps: true,
  versionKey: false
})

module.exports = model('Institucion', InstitucionSchema)