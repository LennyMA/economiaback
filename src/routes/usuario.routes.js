import { Router } from 'express'
import * as usuariosController from '../controllers/usuario.controller'

const router = Router()


router.post('/', usuariosController.iniciarSesion)
//outer.post('/', usuariosController.registrarUsuario)
router.get('/:correo', usuariosController.buscarUsuarioxCorreo)
router.delete('/:correo', usuariosController.eliminarUsuario)
router.put('/:id', usuariosController.actualizarUsuario)


export default router