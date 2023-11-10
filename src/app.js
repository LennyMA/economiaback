import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import UsuariosRoutes from './routes/usuario.routes'
import CategoriasRoutes from './routes/categoria.routes'
import InstitucionRoutes from './routes/institucion.routes'


const app = express()

//configuraciones
app.set('port', process.env.PORT || 3000)

//middlewars
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//rutas
app.get('/', (req, res) => {
  res.send('Bienvenido')
})

app.use('/api/usuarios', UsuariosRoutes)
app.use('/api/iniciarSesion', UsuariosRoutes)
app.use('/api/categorias', CategoriasRoutes)
app.use('/api/institucion', InstitucionRoutes)

export default app