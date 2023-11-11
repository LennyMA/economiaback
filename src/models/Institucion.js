import { Schema, model } from 'mongoose'

const InstitucionSchema = new Schema({
  nombreInstitucion: {
    type: String,
    required: true
  },
  logo: {
    type: Buffer
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