const { Router } = require('express')
const { check } = require('express-validator')
const { crearProyecto, obtenerProyectos, actualizarProyecto, eliminarProyecto } = require('../controllers/proyecto.controller')
const auth = require('../midelware/auth')
const router = Router()

// rutas de proyectos
// api/proyectos 
router.route('/')
    .post(auth,
        [
            check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
        ],
        crearProyecto)
    .get(auth, obtenerProyectos)

router.route('/:id')
    .put(auth,
        [
            check('name', 'El nombre del proyecto es obligatorio').not().isEmpty()
        ],
        actualizarProyecto
    )
    .delete(auth, eliminarProyecto)

module.exports = router