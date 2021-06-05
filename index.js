const express = require('express')
const conectarDb = require('./config/db')
const cors = require('cors')

// crear servidor 
const app = express()

// conectar a la base de datos 
conectarDb()

// habilitar cors 
const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "https://nifty-lamport-1ee75c.netlify.app/", //servidor que deseas que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }
    }
}
app.use(cors(config.application.cors.server))


// habilitar express.json()
app.use(express.json({ extended: true }))
// configuar pueerto 
const port = process.env.port || 4000

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyecto.route'))
app.use('/api/tareas', require('./routes/tarea.routes'))




// ejecutar Servidor 
app.listen(port, '0.0.0.0', () => {
    console.log(`servifor ejecutandose en el puerto ${port}`);
})