const { Router } = require('express')
const { check } = require('express-validator')
const { crearTarea, obtenerTareas, actualizarTarea, eliminarTarea } = require('../controllers/tarea.controller')
const auth = require('../midelware/auth')
const router = Router()

// rutas de tareas: api/tareas
router.route('/')
    .post(auth,
        [check('name', 'El nombre de la tarea es obligatorio').not().isEmpty(),
        check('proyecto', 'El proyecto es obligatorio').not().isEmpty()
        ],
        crearTarea)
    .get(auth, obtenerTareas)
router.route('/:id')
    .put(auth, actualizarTarea)
    .delete(auth, eliminarTarea)

module.exports = router