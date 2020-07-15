const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    cpf: {
        type: String,
        required: true,
        index: { unique: true }
    },
    rg: {
        type: String,
        required: true
    },
    data_nascimento: {
        type: Date,
        required: true
    },
    endereco: {
        type: String,
        required: true
    },
    estado_civil: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Cuidador', esquema,
    'cuidador')