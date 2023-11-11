import { Router } from 'express'
import * as institucionController from '../controllers/institucion.controller'
import multer from 'multer'

const router = Router()
const upload = multer()

router.put('/:id',upload.single('logo'), institucionController.actualizarInstitucion)
router.post('/', upload.single('logo'), institucionController.agregarInstitucion)
router.get('/:id', institucionController.obtenerLogoInstitucion)
router.get("/", institucionController.obtenerInstitucion);

export default router