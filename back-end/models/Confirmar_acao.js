const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    cuidador: {
        type: mongoose.ObjectId,
        ref: 'Cuidador',
        required: true
    },
    data_hora: {
        type: Date,
        required: true
    },
    medicamento: {
        type: mongoose.ObjectId,
        ref: 'Medicamento',
        required: false
    },
    horario: {
        type: mongoose.ObjectId,
        ref: 'Horario',
        required: false
    },
    confirmar_horario: {
        type: Boolean,
        required: false
    },
    confirmar_medicamento: {
        type: Boolean,
        required: false
    }
})

module.exports = mongoose.model('Confirmar_acao', esquema,
    'confirmar_acao')