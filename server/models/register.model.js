
const mongoose = require('mongoose');
const RegisterSchema = new mongoose.Schema({
    usuario: {type: String
    },
    password: { type: String,
    required: true
    },
    email: {type: String,
    required: true
    },

}, { timestamps: true });
module.exports.Register = mongoose.model('Register', RegisterSchema);
