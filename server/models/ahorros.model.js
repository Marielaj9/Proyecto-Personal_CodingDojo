const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AhorroSchema = new mongoose.Schema({
    descripcion: {type: String},
    monto: { type: Number },
    date: {type: String},
    register: { type: Schema.Types.ObjectId, ref: 'Register', required: true }
}, { timestamps: true });
module.exports.Ahorro = mongoose.model('Ahorro', AhorroSchema);
