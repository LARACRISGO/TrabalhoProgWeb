const mongoose = require('mongoose')

const esquema = mongoose.Schema({
   nome: {
       type: String,
       required: true,
   },
   data_nascimento: {
        type: Date,
        required: true
   },
   cpf: {
       type: String,
       required: true,
       index: { unique: true }
   },
   rg: {
       type: String
   },
   endereco: {
       type: String,
       required: true
   },
   estado_civil: {
       type: String
   },
   peso: {
        type: String,
        required: true
   },
   altura: {
       type: String,
       required: true
   },
   telefone_emergencia: {
       type: String,
       required: true
   },
   enfermidades: {
       type: String,
       required: true
   },
   alergia_medicamento: {
    type: String
    },
    cuidador: {
        type: mongoose.ObjectId,
        ref: 'Cuidador',
        required: false
    },
    responsavel: {
        type: mongoose.ObjectId,
        ref: 'Responsavel',
        required: false
    }
})

module.exports = mongoose.model('Idoso', esquema,
    'idoso')