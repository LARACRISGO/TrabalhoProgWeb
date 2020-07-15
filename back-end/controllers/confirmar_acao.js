const Confirmar_acao = require('../models/Confirmar_acao')

const controller = {}

controller.novo = async (req, res) => {
    try {
        await Confirmar_acao.create(req.body)
        res.status(201).end()
    }
    catch(erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.listar = async (req, res) => {
    
    if(Object.keys(req.query).length > 0) {
        busca(req, res)
    }
    else {
        try {
            const lista = await Confirmar_acao.find().populate('horario').populate('medicamento')
            res.send(lista)
        }
        catch {
            console.log(erro)
            res.status(500).send(erro)
        }
    }
}

controller.obterUm = async (req, res) => {
    try {
        const id = req.params.id
        const obj = await Confirmar_acao.findById(id)
        if(obj) {
            res.send(obj)
        }
        else{
            res.status(404).end()
        }
    }
    catch(erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.atualizar = async (req, res) => {
    try {
        const id = req.body._id
        const obj = await Confirmar_acao.findByIdAndUpdate(id, req.body)
        if(obj) {// obj encontrado e atualizado
            //HTTP 204: No content
            res.status(204).end()
        }
        else { 
            res.status(404).end()
        }
    }
    catch(erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

controller.excluir = async (req, res) => {
    try {
        const id = req.body._id
        const obj = await Confirmar_acao.findByIdAndDelete(id)
        if(obj){
            res.status(204).end()
        }
        else {
            res.status(404).end()
        }
    }
    catch(erro){
        console.log(erro)
        res.status(500).send(erro)
    }
}

async function busca(req, res) {
    let criterio = {}

    const atrib = Object.keys(req.query)[0];
    const valor = Object.values(req.query)[0];

    // $options: 'i' => case insensitive
    criterio[atrib] = { $regex: valor, $options: 'i'}

    console.log('Critério:')
    console.log(criterio)

    try {
        const lista = await Confirmar_acao.find(criterio);
        res.send(lista)
    }
    catch(erro) {
        console.log(erro)
        res.status(500).send(erro)
    }
}

module.exports = controller