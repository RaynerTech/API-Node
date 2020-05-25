const mongoose = require('mongoose')

const Registro = new mongoose.Schema({
    nome:{
        type: String,
        required: true
    },
    sobreNome:{
        type: String,
        required: true
    },

    empresa:{
        type: String,
        required: true
    }
},
{
    timestamps:true,

})

mongoose.model('registro', Registro)

   