import Institucion from "../models/Institucion";

export const obtenerInstitucion = async (req, res) => {
  try {
    const institucion = await Institucion.find();
    res.json({
      institucion,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Algo ha salido mal",
      error: error.message,
    });
  }
};

export const agregarInstitucion = async (req, res) => {
  try {
    const nuevaInstitucion = new Institucion({
      nombreInstitucion: req.body.nombreInstitucion,
      logo: req.body.logo,
      color: req.body.color,
      publicidad: req.body.publicidad || [],
    });

    const institucionGuardada = await nuevaInstitucion.save();
    res.json({
      institucionGuardada,
      creado: true,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo ha salido mal",
      error: error.message,
    });
  }
};

export const actualizarInstitucion = async (req, res) => {
  try {
    const institucion = await Institucion.findById(req.params.id);

    institucion.nombreInstitucion =
      req.body.nombreInstitucion || institucion.nombreInstitucion;
    institucion.logo = req.body.logo || institucion.logo;
    institucion.color = req.body.color || institucion.color;
    institucion.publicidad = req.body.publicidad || institucion.publicidad;

    await institucion.save();

    res.json({
      mensaje: `Institucion ${institucion.nombreInstitucion} actualizada`,
    });
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo ha salido mal",
      error: error.message,
    });
  }
};

