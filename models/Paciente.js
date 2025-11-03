const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
    nombre: {
        type: String, required: true
    },
    fechaNacimiento: {
        type: Date,
        required: false
    },
    telefono: {
        type: String,
        required: false
    },
    direccion: {
        type: String,
        required: false
    },
    correoElectronico: {
        type: String,
        required: false
    },
    creadoPor: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Paciente', pacienteSchema);