import express from 'express'
import morgan from 'morgan'
import UsuariosRoutes from './routes/usuario.routes'
import CategoriasRoutes from './routes/categoria.routes'
import InstitucionRoutes from './routes/institucion.routes'
// import iniciarSesionRoutes from './routes/usuario.routes'
// import registrarUsuarioRoutes from './routes/usuario.routes'
// import buscarUsuarioxCorreoRoutes from './routes/usuario.routes'
// import eliminarUsuarioRoutes from './routes/usuario.routes'
// import actualizarClaveRoutes from './routes/usuario.routes'


const app = express()

//configuraciones
app.set('port', process.env.PORT || 3000)

//middlewars
app.use(morgan('dev'))
app.use(express.json())

//rutas
app.get('/', (req, res) => {
  res.send('Bienvenido')
})

app.use('/api/usuarios', UsuariosRoutes)
app.use('/api/iniciarSesion', UsuariosRoutes)
app.use('/api/categorias', CategoriasRoutes)
app.use('/api/institucion', InstitucionRoutes)
// app.use('/api/registrarUsuario', registrarUsuarioRoutes)
// app.use('/api/buscarUsuarioxCorreo', buscarUsuarioxCorreoRoutes)
// app.use('/api/eliminarUsuario', eliminarUsuarioRoutes)
// app.use('/api/actualizarClave', actualizarClaveRoutes)

export default app