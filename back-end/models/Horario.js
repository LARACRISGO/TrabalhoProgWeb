const mongoose = require('mongoose')

const esquema = mongoose.Schema({
    idoso: {
        type: mongoose.ObjectId,
        ref: 'Idoso',
        required: true
    },
    tipo: {
        type: String,
        required: true
    },
   quantidade_ml: {
       type: Number,
       required: true,
       validate: {
           validator: function(val) {
               return val > 0
           },
           message: 'A quantidade deve ser maior do que zero'
       }
   },
   horario: {
       type: String,
       required: true
   }
})

module.exports = mongoose.model('Horario', esquema,
    'horario')