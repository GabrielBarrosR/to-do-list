const mongoose = require('mongoose')

const ListSchema = new mongoose.Schema({
    titulo: {type: String, required: true},
    descricao: {type: String, required: true},
    done: {type: Boolean, required: true}
})

module.exports = mongoose.model('List', ListSchema, 'list');