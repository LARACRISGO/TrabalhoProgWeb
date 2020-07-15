const mongoose = require('mongoose')

const mongooseSeq = require('mongoose-sequence')(mongoose);

const esquema = mongoose.Schema({
    idoso: {
        type: mongoose.ObjectId,
        ref: 'Idoso',
        required: true
    },
   nome: {
       type: String,
       required: true
   },
   dosagem: {
       type: String,
       required: true
   },
   horario: {
       type: String,
       required: true
   }
})

module.exports = mongoose.model('Medicamento', esquema,
    'medicamento')