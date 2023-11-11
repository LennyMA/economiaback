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
      color: req.body.color,
      publicidad: req.body.publicidad || [],
    });

    if (req.file) {
      nuevaInstitucion.logo = req.file.buffer;
    }

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
    institucion.logo = req.file.buffer || institucion.logo;
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

export const obtenerLogoInstitucion = async (req, res) => {
  try {
    const institucion = await Institucion.findById(req.params.id);

    if (!institucion || !institucion.logo) {
      return res.status(404).json({
        mensaje: "Institución no encontrada o sin logo",
      });
    }

    res.set("Content-Type", "image/png");
    res.send(institucion.logo);
  } catch (error) {
    return res.status(500).json({
      mensaje: "Algo ha salido mal",
      error: error.message,
    });
  }
};
