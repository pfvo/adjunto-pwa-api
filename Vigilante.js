const mongoose = require('mongoose');

const vigilanteSchema = new mongoose.Schema({
    mec: {
        type: String,
        unique: true
    },
    nome: String,
    telemovel: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },   
    aniversario: String,
    morada: { rua: String, postal: String, cidade: String },
    contrato: { tipo: String, inicio: String, fim: String },
    roles: [],
    chefia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vigilante'
    },
    ausencias:[],
    fardamento:{
        classico:[],
        tatico:[],
        outro:[]
    },
    notas: String
});

module.exports = mongoose.model("Vigilante", vigilanteSchema)