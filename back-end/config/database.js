const mongoose = require('mongoose')

module.exports = function(uri) {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    mongoose.connection.on('connected', ()=> 
    console.log(`mongoose! conectado a${uri}`))

    mongoose.connection.on('disconnected', ()=> 
    console.log(`mongoose! conectado a${uri}`))
    
    mongoose.connection.on('error', erro => 
    console.log(`Mongoose! ERRO ao conectar a ${uri}: ${erro}`))

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('Mongoose! dseconectado pelo término da aplicação')
            process.exit(0) // 0 => saída sem erros
        })
    })

}

