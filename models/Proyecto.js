const { Schema, model, Mongoose } = require('mongoose')
const proyectoSchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true

    },
    creador: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    }
})
module.exports = model('Proyecto', proyectoSchema)