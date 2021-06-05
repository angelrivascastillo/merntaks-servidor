const Usuario = require("../models/Usuarios")
const bscriptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const { findById } = require("../models/Usuarios")

const authController = {}
authController.autenticarUsuario = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    // destructurar paswword y email 
    const { password, email } = req.body
    try {
        let usuario = await Usuario.findOne({ email })
        if (!usuario) return res.status(400).json({ msg: 'El usuario no existe' })

        // revisar password 
        let passwordCorrecta = await bscriptjs.compare(password, usuario.password)
        if (!passwordCorrecta) return res.status(400).json({ msg: 'Password incorrecto' })

        // si todo es correcto  crear y firmar jwt 
        const payload = {
            usuario: {
                id: usuario.id
            }

        }
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 432000 //cinco dias ,1 hora=3600
        }, (error, token) => {
            if (error) throw error

            // mensaje de confirmacion 
            res.json({ token })

        })
    } catch (error) {
        res.status(500).json({ msg: 'hubo un error' })
    }
}
authController.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password')
        res.json({ usuario })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'hubo un error' })

    }

}
module.exports = authController