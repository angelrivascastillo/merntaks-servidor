// rutas para autenticar usuarios
const express = require('express')
const router = express.Router()


// valida un usuario :api/auth 
router.route('/')
    .get((req, res) => {
        res.json({
            msg: 'bienvenido'
        })
    })

module.exports = router
