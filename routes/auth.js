// rutas para autenticar usuarios
const express = require('express')
const { check } = require('express-validator')
const { autenticarUsuario, usuarioAutenticado } = require('../controllers/authController')
const auth = require('../midelware/auth')

const router = express.Router()


// valida un usuario :api/auth 
router.route('/')
    .post(
        // [
        //     check('email', 'El email no es válido').isEmail(),
        //     check('password', 'El password debe ser minimo de 6 caracteres').isLength({ min: 6 })


        // ],
        autenticarUsuario
    )
    .get(auth, usuarioAutenticado)

module.exports = router
