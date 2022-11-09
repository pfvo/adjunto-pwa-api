const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const Workplace = require('./Workplace');
const Vigilante = require('./Vigilante');


const mockDb = {
    users: [
        {
            name: 'Pedro',
            email: 'pedro@gmail.com',
            password: 'pedro123'
        }
    ]
}

mongoose.connect("mongodb://localhost/testdb", ()=>console.log('connected'))

const app = express()
// app.use(express.urlencoded({extended: false}));
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    // async function insertWorkplace(){
    //     const workplace = await Workplace.create({
    //         nome: '',
    //         localidade: '',
    //         isModalOpen: false,
    //         lastUpdated: {
    //         },
    //         chefia: ["2601"],
    //         contrato: {
        
    //         },
    //         options: {
    //             segunda: {
    //                 inicio: "00:00",
    //                 fim: "23:59"
    //             },
    //             terça: {
    //                 inicio: "00:00",
    //                 fim: "23:59"
    //             },
    //             quarta: {
    //                 inicio: "00:00",
    //                 fim: "23:59"
    //             },
    //             quinta: {
    //                 inicio: "00:00",
    //                 fim: "23:59"
    //             },
    //             sexta: {
    //                 inicio: "00:00",
    //                 fim: "23:59"
    //             },
    //             sabado: {
    //                 inicio: "00:00",
    //                 fim: "23:59"
    //             },
    //             domingo: {
    //                 inicio: "00:00",
    //                 fim: "23:59"
    //             },
    //             feriado: {
    //                 inicio: "00:00",
    //                 fim: "23:59"
    //             }
    //         },
    //         feriados: [],
    //         vigilantes: [],
    //         horarios:[
         
    //         ],
    //         schedules: [
    //         ],
    //         dates: {
    //             //talvez tentar com full date 2022-07-01: {vig: horario}
    //         },
    //         selectedSchedule: { 
    //             id : 1,
    //             start: "2022-07-01",
    //             end: "2022-07-01",
    //             vigilantes: []
    //         }
    //     })
    //     console.log(workplace)
    //     res.json(workplace)
    // }
    // insertWorkplace()
    console.log('serverconnected')
})


app.post('/signin', (req, res) => {
    if (req.body.email === mockDb.users[0].email && 
    req.body.password === mockDb.users[0].password) {
        res.json('success')
    } else {
        res.status(400).json('error logging in')
    }
})

app.post('/register', (req, res) => {

})

app.post('/office/workplaces', (req, res)=> {
    async function getWorkplaceList(){
        try{
            const workplaceList = await Workplace.find({ chefia: req.body.userId })
            return res.json(workplaceList)
        } catch {
            return res.status(400).json('Error Finding Workplaces')
        }
    }
    getWorkplaceList()
})

app.post('/office/workplaces/insert', (req, res)=> {
    async function insertWorkplace(){
        try{
        const workplace = await Workplace.create({
            nome: req.body.nome,
            local: {
                morada: req.body.local.morada,
                postal: req.body.local.postal,
                localidade: req.body.local.localidade,
                distrito: req.body.local.distrito,
            },
            chefia: req.body.chefia,
            contrato: {
                tipo: req.body.contrato.tipo,
                inicio: req.body.contrato.inicio,
                fim: req.body.contrato.fim
            },
            schedules:[
                {
                    id: req.body.schedules.id,
                    start: req.body.schedules.start,
                    end: req.body.schedules.end,
                    vigilantes: req.body.schedules.vigilantes
                }
            ],
            selectedSchedule: { 
                id: req.body.schedules.id,
                start: req.body.schedules.start,
                end: req.body.schedules.end,
                vigilantes: req.body.schedules.vigilantes
            }
        })
        console.log(workplace)
        res.json(workplace)
    } catch(e){
        console.log(e)
    }
    }
    insertWorkplace()
})

app.delete('/office/workplaces/delete', (req, res) => {
    async function deleteWorkplace() {
        try {
            return Workplace.deleteOne({_id: req.body.id})
        } catch {
            return res.status(404).json('Something went wrong')
        }
    }
    deleteWorkplace()
})

app.get('/office/workplaces/:id', (req, res) => {
    async function getWorkplace(){
        try{
            const workplace = await Workplace.find({_id: req.params.id})
            return res.json(workplace)
        } catch {
            console.log('eeeeerrrooor')
            return res.status(404).json('Page Not Found')
        }
    }
        getWorkplace()
})

app.put('/office/workplaces/:id', (req, res) => {
    async function updateWorkplace(){
        try{
            const workplace = await Workplace.findOneAndUpdate({_id: req.params.id}, {$set:req.body.workplace})
            return res.status(200).json(workplace)
        } catch(e) {
            console.log(e)
            return res.status(404).json('Page Not Found')
        }
    }
        updateWorkplace()
})

app.get('/office/vigilantes', (req, res)=> {
    async function getVigilanteList(){
        try {
            const vigilantes = await Vigilante.find().populate('chefia', 'nome')
            return res.json(vigilantes)
        } catch {
            console.log('eeeeerrrooor')
            return res.status(404).json('Page Not Found')
        }
    }
    getVigilanteList()
})

app.post('/office/vigilantes/insert', (req, res)=> {
    async function insertVigilante(){
        try {
            const vigilante = await Vigilante.create({
                mec: req.body.mec,
                nome: req.body.nome,
                telemovel: req.body.telemovel,
                email: req.body.email,
                aniversario: req.body.aniversario,
                morada: { rua: req.body.morada.rua, postal: req.body.morada.postal, cidade: req.body.morada.cidade },
                contrato: { tipo: req.body.contrato.tipo, inicio: req.body.contrato.inicio, fim: req.body.contrato.fim },
                roles: req.body.roles,
                // chefia: req.body.chefia
                
            })
           return res.json(vigilante)

        } catch(e){
            console.log(e)
            return res.status(404).json('ups')
        }
    }
    insertVigilante()
})

app.delete('/office/vigilantes/delete', (req, res) => {
    async function deleteVigilante() {
        try {
            return  await Vigilante.deleteOne({_id: req.body.id})
        } catch {
            return res.status(400).json('Something went wrong')
        }
    }
    deleteVigilante()
})


app.get('/office/vigilantes/:id', (req, res) => {
    async function findVigilante(){
        try{
            const vigilante = await Vigilante.find({_id: req.params.id}).populate('chefia')
            return res.json(vigilante)
        } catch {
            console.log('eeeeerrrooor')
            return res.status(404).json('Page Not Found')
        }
    }
    findVigilante()
})

app.put('/office/vigilantes/:id/fardamento', (req, res) => {
    async function updateFardamento(){
        try{
            const vigilante = await Vigilante.find({_id: req.params.id}).updateOne({fardamento: req.body.fardamento})
            return res.status(200).json('ok')
        } catch(e) {
            console.log('error mand', e)
            return res.status(404).json('Page Not Found')
        }
    }
    updateFardamento()
})

app.put('/office/vigilantes/:id', (req, res) => {
    async function updateVigilante(){
        try{
            const vigilante = await Vigilante.findOneAndUpdate({_id: req.params.id}, {$set:req.body.vigilante})
            return res.status(200).json(vigilante)
        } catch(e) {
            console.log('error mand', e)
            return res.status(404).json('Page Not Found')
        }
    }
    updateVigilante()
})

// ENDPOINTS


//--------------------------------------
//          MAIN
//--------------------------------------
// '/' --> REMOVER?
// '/signin' --> POST por segurança da PASS (USAR BCRYPT)
    //(FALTA PARTE DO BCRYPT E DB!!!!)
// '/register' --> POST por segurança da PASS (USAR BCRYPT)
// '/home' --> GET res.json(user)????????



//--------------------------------------
//          VIGILANTE
//--------------------------------------
// AINDA NAO DEFINIDOS --> meH....



//--------------------------------------
//          ESCALADOR
//--------------------------------------
// '/office'
// '/office/workplaces' --> feito
// '/office/workplaces/:id'
// '/office/vigilantes'
// '/office/vigilantes/:id'
// '/office/requests'
// '/office/requests/:id'
        

app.listen(3003, ()=> {
    console.log('app is listening on port 3003')
})