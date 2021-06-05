// rutas de usuarios 
const express = require('express')
const { check } = require('express-validator')

const { crearUsuario } = require('../controllers/usuarioController')
const router = express.Router()


// crea un usuario :api/usuarios 
router.post('/',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email no es válido').isEmail(),
        check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })


    ],
    crearUsuario
)
module.exports = router
