import { Router } from 'express'
import * as categoriasController from '../controllers/categoria.controller'

const router = Router()


router.get('/', categoriasController.buscarCategorias)
router.get('/:id', categoriasController.buscarCategoriaxId)
router.post('/', categoriasController.agregarCategoria)
router.put('/:id', categoriasController.actualizarCategoria)
router.delete('/:id', categoriasController.eliminarCategoria)


export default router