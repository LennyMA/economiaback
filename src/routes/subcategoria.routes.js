import { Router } from "express";
import * as subcategoriasController from "../controllers/subcategoria.controller";

const router = Router();

router.get("/:idCategoria", subcategoriasController.buscarSubcategorias);
router.get("/:id", subcategoriasController.buscarSubcategoriaxId);
router.post("/", subcategoriasController.agregarSubcategoria);
router.put("/:id", subcategoriasController.actualizarSubcategoria);
router.delete("/:id", subcategoriasController.eliminarSubcategoria);

export default router;
