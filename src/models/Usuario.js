import { Schema, model } from 'mongoose'
import bcrypt from 'bcryptjs'

const UsuarioSchema = new Schema({
  correo: {
    type: String,
    required: true,
    trim: true
  },
  clave: {
    type: String,
    required: true,
    trim: true
  },
}, {
  timestamps: true,
  versionKey: false
})

/*
para cifrar la clave el metodo genSalt es para que sea mas seguro, recive un valor entero
para decirle cuantas veces se va a ejecutar, normalmente es 10
 */
UsuarioSchema.pre(['save', 'findByIdAndUpdate'], async function (next) {
  // Verificar si la contraseña ha sido modificada
  if (!this.isModified('clave')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedClave = await bcrypt.hash(this.clave, salt);
    this.clave = hashedClave;
    next();
  } catch (error) {
    return next(error);
  }
})

//comparar claves para el login
UsuarioSchema.methods.compararClave = async function (clave) {
  return await bcrypt.compare(clave, this.clave)
}

module.exports = model('Usuario', UsuarioSchema)