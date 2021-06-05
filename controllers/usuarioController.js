const Usuario = require("../models/Usuarios")
const bscriptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')

const usuarioController = {}
usuarioController.crearUsuario = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    const { email, password } = req.body

    try {
        // revisar que el usuario sea unico 
        let usuario = await Usuario.findOne({ email })
        if (usuario) {
            return res.status(400).send({ msg: 'El usuario ya existe' })
        }
        // crear nuevo usuario
        usuario = new Usuario(req.body)

        // hashear password 
        const salt = await bscriptjs.genSalt(10)
        const hash = await bscriptjs.hash(password, salt)
        usuario.password = hash

        // guardar usuario 
        await usuario.save()

        // crear y firmar jwt 
        const payload = {
            usuario: {
                id: usuario.id
            }

        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 //1 hora
        }, (error, token) => {
            if (error) throw error

            // mensaje de confirmacion 
            res.json({ token })

        })

    } catch (error) {
        console.log('hubo un error');
        res.status(400).send('hubo un error')

    }
}
module.exports = usuarioController