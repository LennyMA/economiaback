import { Router } from 'express'
import * as institucionController from '../controllers/institucion.controller'

const router = Router()

router.put('/:id', institucionController.actualizarInstitucion)

export default router