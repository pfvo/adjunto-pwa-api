const mongoose = require('mongoose')

const workplaceSchema = new mongoose.Schema({
    nome: String,
    local: {
        morada: String,
        postal: String,
        localidade: String,
        distrito: String,
    },
    isModalOpen: Boolean,
    lastUpdated: {
        user: String,
        date: {
            type: Date,
            default: ()=> Date.now()
        }
    },
    contrato: {},
    options: {
        segunda: {
            inicio: {type: String, default: '00:00'},
            fim: {type: String, default: '23:59'}
        },
        terça: {
            inicio: {type: String, default: '00:00'},
            fim: {type: String, default: '23:59'}
        },
        quarta: {
            inicio: {type: String, default: '00:00'},
            fim: {type: String, default: '23:59'}
        },
        quinta: {
            inicio: {type: String, default: '00:00'},
            fim: {type: String, default: '23:59'}
        },
        sexta: {
            inicio: {type: String, default: '00:00'},
            fim: {type: String, default: '23:59'}
        },
        sabado: {
            inicio: {type: String, default: '00:00'},
            fim: {type: String, default: '23:59'}
        },
        domingo: {
            inicio: {type: String, default: '00:00'},
            fim: {type: String, default: '23:59'}
        },
        feriado: {
            inicio: {type: String, default: '00:00'},
            fim: {type: String, default: '23:59'}
        }
    },
    feriados: [],
    vigilantes: [],
    horarios: [],
    schedules: [],
    dates: {},
    selectedSchedule: {
        id: Number,
        start: String,
        end: String,
        vigilantes: []
    }
});

module.exports = mongoose.model("Workplace", workplaceSchema)