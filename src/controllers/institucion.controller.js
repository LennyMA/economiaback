import Institucion from '../models/Institucion'

export const actualizarInstitucion = async (req, res) => {
  try {
    if (!req.body.nombreInstitucion || !req.body.logo || !req.body.color) {
      return res.status(400).json({
        mensaje: 'Existen campos vacios'
      })
    }

    const institucion = await Institucion.findById(req.params.id)

    institucion.nombreInstitucion = req.body.nombreInstitucion || institucion.nombreInstitucion
    institucion.logo = req.body.nombreInstitucion || institucion.logo
    institucion.color = req.body.nombreInstitucion || institucion.color

    await institucion.save()

    res.json({
      mensaje: `Institucion ${institucion.nombreInstitucion} actualizada`
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Algo ha salido mal',
      error: error.message
    })
  }
}

