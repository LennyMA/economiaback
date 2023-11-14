import Usuario from '../models/Usuario'

export const obtenerUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.find();
    res.json({
      usuario,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Algo ha salido mal",
      error: error.message,
    });
  }
};

export const iniciarSesion = async (req, res) => {
  // const { correo, clave } = req.body
  try {
    const usuario = await Usuario.findOne({ correo: req.body.correo })

    if (!usuario) {
      return res.status(400).json({
        mensaje: `No existe el usuario ${req.body.correo}`
      })
    }

    const claveCorrecta = await usuario.compararClave(req.body.clave)

    if (!claveCorrecta) {
      return res.status(401).json({
        mensaje: 'Clave incorrecta'
      })
    }

    // const token = generarTokenAutenticacion(usuario)
    return res.json({
      "encontrado": true
    })

  } catch (error) {
    return res.status(500).json({
      mensaje: 'Algo ha salido mal en login',
      "encontrado": false,
      error: error.mensaje
    })
  }
}

export const registrarUsuario = async (req, res) => {
  try {
    if (!req.body.correo || !req.body.clave) {
      return res.status(400).json({
        mensaje: 'Correo y clave son campos requeridos'
      })
    }

    const usuario = await Usuario.findOne({ correo: req.body.correo })

    if (usuario) {
      return res.status(400).json({
        mensaje: `El usuario ${usuario.correo} ya existe`,
      })
    }

    const nuevoUsuario = new Usuario({
      correo: req.body.correo,
      clave: req.body.clave
    })

    const usuarioGuardado = await nuevoUsuario.save()
    res.json({
      usuarioGuardado,
      "creado": true
    })
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Algo ha salido mal'
    })
  }
}

export const buscarUsuarioxCorreo = async (req, res) => {
  try {
    const usuario = await Usuario.findOne({ correo: req.params.correo })

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'No existe el usuario con ese correo buscarxC'
      })
    }

    return res.json(usuario)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Algo ha salido mal'
    })
  }
}

export const eliminarUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.findOneAndDelete({ correo: req.params.correo })

    if (!usuario) {
      return res.status(404).json({
        mensaje: 'No existe el usuario eliminarU'
      })
    }

    return res.json({
      mensaje: `Usuario ${usuario.correo} eliminado`
    })
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Algo ha salido mal'
    })
  }
}

export const actualizarUsuario = async (req, res) => {
  try {
    if (!req.body.clave) {
      return res.status(400).json({
        mensaje: 'La clave es un campo requerido'
      })
    }

    const usuario = await Usuario.findById(req.params.id)

    usuario.clave = req.body.clave

    await usuario.save()

    res.json({
      mensaje: `Clave del ${usuario.correo} actualizada`
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Algo ha salido mal',
      error: error.message
    })
  }
}

