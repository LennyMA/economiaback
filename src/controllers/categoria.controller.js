import Categoria from '../models/Categoria'

export const buscarCategorias = async (req, res) => {
  try {
    const categoria = await Categoria.find()

    if (categoria.length <= 0) {
      return res.status(404).json({
        mensaje: 'No existen categorias'
      })
    }

    return res.json(categoria)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Algo ha salido mal categoria buscar'
    })
  }
}

export const buscarCategoriaxId = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id)

    if (!categoria) {
      return res.status(404).json({
        mensaje: 'No existe la categoria'
      })
    }

    return res.json(categoria)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Algo ha salido mal'
    })
  }
}

export const agregarCategoria = async (req, res) => {
  try {
    if (!req.body.nombreCategoria) {
      return res.status(400).json({
        mensaje: 'El nombre de la categoria es un campo requerido'
      })
    }

    const categoria = await Categoria.findOne({ nombreCategoria: req.body.nombreCategoria })

    if (categoria) {
      return res.status(400).json({
        mensaje: `La categoria ${categoria.nombreCategoria} ya existe`,
      })
    }

    const nuevaCategoria = new Categoria({
      nombreCategoria: req.body.nombreCategoria,
      cobrosIndirectos: {
        seguro: req.body.cobrosIndirectos.seguro ? req.body.cobrosIndirectos.seguro : 0,
        donaciones: req.body.cobrosIndirectos.donaciones ? req.body.cobrosIndirectos.donaciones : 0,
      },
      requisitos: req.body.requisitos
    })

    const categoriaGuardada = await nuevaCategoria.save()
    res.json(categoriaGuardada)
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Algo ha salido mal'
    })
  }
}


export const eliminarCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.findByIdAndDelete(req.params.id)

    if (!categoria) {
      return res.status(404).json({
        mensaje: 'No existe la categoria'
      })
    }

    return res.json({
      mensaje: `Categoria ${categoria.nombreCategoria} eliminada`
    })
  } catch (error) {
    return res.status(500).json({
      mensaje: 'Algo ha salido mal'
    })
  }
}

export const actualizarCategoria = async (req, res) => {
  try {
    if (!req.body.nombreCategoria) {
      return res.status(400).json({
        mensaje: 'La categoria es un campo requerido'
      })
    }

    const categoria = await Categoria.findById(req.params.id)
    const nombreCategoria = await Categoria.findOne({nombreCategoria: req.body.nombreCategoria})

    if(nombreCategoria){
      return res.status(400).json({
        mensaje: `La categoria ${nombreCategoria.nombreCategoria} ya existe`,
      })
    }
    categoria.nombreCategoria = req.body.nombreCategoria || categoria.nombreCategoria;
    categoria.cobrosIndirectos.seguro = (req.body.cobrosIndirectos && req.body.cobrosIndirectos.seguro !== undefined) ? req.body.cobrosIndirectos.seguro : categoria.cobrosIndirectos.seguro;
    categoria.cobrosIndirectos.donaciones = (req.body.cobrosIndirectos && req.body.cobrosIndirectos.donaciones !== undefined) ? req.body.cobrosIndirectos.donaciones : categoria.cobrosIndirectos.donaciones;

    await categoria.save()

    res.json({
      mensaje: `Categoria actualizada`
    })
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: 'Algo ha salido mal',
      error: error.message
    })
  }
}

