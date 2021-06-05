const { validationResult } = require("express-validator")
const Proyecto = require("../models/Proyecto")

const proyectosCtr = {}
proyectosCtr.crearProyecto = async (req, res) => {

    // revisar si hay errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        // crear proyecto 
        const proyecto = new Proyecto(req.body)


        // guardar creador via jwt 
        proyecto.creador = req.usuario.id
        // guardar proyecto 
        await proyecto.save()
        res.json(proyecto)

    } catch (error) {
        res.status(500).send('Hubo un error')

    }

}
// obtener proyectos del suario actual 
proyectosCtr.obtenerProyectos = async (req, res) => {
    try {
        const proyectos = await Proyecto.find({ creador: req.usuario.id }).sort({ creado: -1 })
        res.json({ proyectos })

    } catch (error) {
        res.status(500).json({
            msg: 'Hubo un error'
        })
    }
}
// actualizar proyecto 
proyectosCtr.actualizarProyecto = async (req, res) => {
    // revisar si hay errores
    const errores = validationResult(req)
    if (!errores.isEmpty()) {
        return res.status(400).json({ errores: errores.array() })
    }

    try {
        const { name } = req.body
        // revisar el id 
        let proyecto = await Proyecto.findById(req.params.id)

        // verificar el creador del proyecto 
        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({ msg: 'Usuario no autorizado' })
        }
        // axtualizar 
        proyecto = await Proyecto.findByIdAndUpdate(req.params.id, { name }, { new: true })
        res.json({ proyecto })

    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error' })
    }


}
// eliminar proyecto por id 
proyectosCtr.eliminarProyecto = async (req, res) => {
    try {
        const { name } = req.body
        // revisar el id 
        let proyecto = await Proyecto.findById(req.params.id)

        // verificar el creador del proyecto 
        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({ msg: 'Usuario no autorizado' })
        }
        // eliminar
        await Proyecto.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Proyecto eliminado' })

    } catch (error) {
        res.status(500).json({ msg: 'Hubo un error' })
    }

}
module.exports = proyectosCtr