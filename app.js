const express = require('express')
const mongoose = require('mongoose')

require('./models/Registro')
const Registro = mongoose.model('registro')

const app = express()


app.use(express.json())
//conectando ao banco de dados 
mongoose.connect('mongodb://localhost/rayner',{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongodb Conectado')
}).catch((err) => {
    console.log('MongoDB não conectado')
})








//Recuperação de registro
app.get('/',(req,res) => {
    Registro.find({}).then((artigo) =>{
        return res.json(artigo)
    } ).catch((erro) =>{
        return res.status(400).json({
            error:true,
            message: 'Não foi encontrado nenhum registro!'
        })
    }) 
})


//Rota receberar o id e buscarar as informações do banco de dados para visualizarmos
app.get('/registro/:id',(req,res) =>{
    console.log(req.params.id);

    Registro.findOne({_id:req.params.id}).then((artigo) =>{
        return res.json(artigo)
    }).catch((erro) =>{
        return res.status(400).json({
            error: true,
            messag:"Não foi encontrado nenhum registro!!"
        })
    })
   
})

//Cadastrar dados
app.post('/registro',(req,res) => {
    const registro = Registro.create(req.body, (err) => {
        if(err) return res.status(400).json({
            error: true,
            message: "Error: Dados não foram cadastrados"

        })

        return res.status(200).json({
            error: false,
            message: "Cadastrado com sucesso "

        })

    })

})

//Editar na API e no banco de dados 
/*exemplo: http://localhost:3000 + o ID recuperado do MongoDB 5ecc24b254b7e92fa443ca9e 
será apresentado uma view com os dados recuperados
*/
app.put('/registro/:id',(req,res) =>{
    const resgistro = Registro.updateOne({_id:req.params.id},req.body,(err) =>{
        if(err) return res.status(400).json({
            error:true,
            message:"Error: O cadastro não foi editado"

        })
        return res.json({
            error: false,
            message: "Registro Editado com seucesso"
        })
    })

})

app.delete('/registro/:id',(req, res) =>{
    const registro = Registro.deleteOne({_id: req.params.id}, (err) =>{
        if(err) return res,status(400).json({
            error:true,
            message: 'Error: O Registro não foi apagado'
        })

        return res.json({
            error: false,
            message:'Apagado com sucesso!!'
        })
    })
})

app.listen(3000, () =>{
    console.log('Servidor iniciado')
    
})