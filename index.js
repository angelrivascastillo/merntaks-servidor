const express = require('express')
const conectarDb = require('./config/db')
const cors = require('cors')

// crear servidor 
const app = express()

// conectar a la base de datos 
conectarDb()

// habilitar cors 
app.use(cors())


// habilitar express.json()
app.use(express.json({ extended: true }))
// configuar pueerto 
const PORT = process.env.PORT || 4000

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/proyectos', require('./routes/proyecto.route'))
app.use('/api/tareas', require('./routes/tarea.routes'))




// ejecutar Servidor 
app.listen(PORT, () => {
    console.log(`servifor ejecutandose en el puerto ${PORT}`);
})