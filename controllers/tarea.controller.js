const { validationResult } = require("express-validator")
const Proyecto = require("../models/Proyecto")
const Tarea = require("../models/Tarea")

const tareasCtrl = {}

// crear una tarea 
tareasCtrl.crearTarea = async (req, res) => {
    try {
        // revisar si hay errores
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() })
        }

        // revisar si proyecto existe 
        const { proyecto: id } = req.body
        const proyecto = await Proyecto.findById(id)
        if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })

        // verificar el creador del proyecto 
        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({ msg: 'Usuario no autorizado' })
        }

        // creamos la tarea
        const tarea = new Tarea(req.body)
        await tarea.save()
        res.json({ tarea })
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'hubo un error' })

    }



}

// obtener tareas por proyectos
tareasCtrl.obtenerTareas = async (req, res) => {
    try {
        // revisar si hay errores
        const errores = validationResult(req)
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() })
        }

        // revisar si proyecto existe 
        // const { proyecto: id } = req.body
        const { proyecto: id } = req.query

        const proyecto = await Proyecto.findById(id)
        if (!proyecto) return res.status(404).json({ msg: 'Proyecto no encontrado' })

        // verificar el creador del proyecto 
        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({ msg: 'Usuario no autorizado' })
        }

        //  obtener tareas 
        const tareas = await Tarea.find({ proyecto: id })
        res.json({ tareas })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }

}
tareasCtrl.actualizarTarea = async (req, res) => {
    try {

        // extraer tarea 
        const { proyecto: id, name, estado } = req.body
        const nuevoProyecto = {}
        nuevoProyecto.name = name
        nuevoProyecto.estado = estado


        // extraer proyecto 
        const proyecto = await Proyecto.findById(id)

        // compobar si existe tarea 
        let tarea = await Tarea.findById(req.params.id)
        if (!tarea) return res.status(404).json({ msg: 'Tarea no encontrada' })


        // verificar el creador del proyecto 
        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({ msg: 'Usuario no autorizado' })
        }

        // actualizar tarea 
        tarea = await Tarea.findOneAndUpdate(req.params.id, nuevoProyecto, { new: true })
        res.json({ tarea })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }

}
tareasCtrl.eliminarTarea = async (req, res) => {
    try {
        // extraer tarea 
        const { proyecto: id } = req.query


        // extraer proyecto 
        const proyecto = await Proyecto.findById(id)

        // compobar si existe tarea 
        let tarea = await Tarea.findById(req.params.id)
        if (!tarea) return res.status(404).json({ msg: 'Tarea no encontrada' })


        // verificar el creador del proyecto 
        if (proyecto.creador.toString() !== req.usuario.id) {
            res.status(401).json({ msg: 'Usuario no autorizado' })
        }

        // eliminar  tarea 
        await Tarea.findByIdAndDelete(req.params.id)
        res.json({ msg: 'Tarea eliminada' })

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Hubo un error' })
    }

}

module.exports = tareasCtrl