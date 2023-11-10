import Subcategoria from "../models/Subcategoria";

export const buscarSubcategorias = async (req, res) => {
  try {
    const idCategoria = req.params.idCategoria;
    const subcategorias = await Subcategoria.find({ idCategoria });

    if (subcategorias.length <= 0) {
      return res.status(404).json({
        mensaje: "No existen subcategorías para esta categoría",
      });
    }

    return res.json(subcategorias);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error en el servidor",
    });
  }
};

export const buscarSubcategoriaxId = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findById(req.params.id);

    if (!subcategoria) {
      return res.status(404).json({
        mensaje: "No existe la subcategoría",
      });
    }

    return res.json(subcategoria);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Error en el servidor",
    });
  }
};

export const agregarSubcategoria = async (req, res) => {
  try {
    if (!req.body.nombreSubcategoria) {
      return res.status(400).json({
        mensaje: "El nombre de la subcategoría es un campo requerido",
      });
    }

    const subcategoria = await Subcategoria.findOne({
      nombreSubcategoria: req.body.nombreSubcategoria,
    });

    if (subcategoria) {
      return res.status(400).json({
        mensaje: `La subcategoría ${subcategoria.nombreSubcategoria} ya existe`,
      });
    }

    const nuevaSubcategoria = new Subcategoria({
      nombreSubcategoria: req.body.nombreSubcategoria,
      tasaInteres: req.body.tasaInteres,
      plazoMaximo: req.body.plazoMaximo,
      montoMinimo: req.body.montoMinimo,
      montoMaximo: req.body.montoMaximo,
      idCategoria: req.body.idCategoria,
    });

    await nuevaSubcategoria.save();
    res.json(true);
  } catch (error) {
    return res.status(500).json(false);
  }
};

export const eliminarSubcategoria = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findByIdAndDelete(req.params.id);

    if (!subcategoria) {
      return res.status(404).json(false);
    }

    res.json(true);
  } catch (error) {
    return res.status(500).json(false);
  }
};

export const actualizarSubcategoria = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findById(req.params.id);

    if (!subcategoria) {
      return res.status(404).json(false);
    }

    subcategoria.nombreSubcategoria =
      req.body.nombreSubcategoria || subcategoria.nombreSubcategoria;
    subcategoria.tasaInteres = req.body.tasaInteres || subcategoria.tasaInteres;
    subcategoria.plazoMaximo = req.body.plazoMaximo || subcategoria.plazoMaximo;
    subcategoria.montoMinimo = req.body.montoMinimo || subcategoria.montoMinimo;
    subcategoria.montoMaximo = req.body.montoMaximo || subcategoria.montoMaximo;
    subcategoria.idCategoria = req.body.idCategoria || subcategoria.idCategoria;

    await subcategoria.save();

    res.json(true);
  } catch (error) {
    return res.status(500).json(false);
  }
};
