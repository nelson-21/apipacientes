const mongoose = require('mongoose');

const citaSchema = new mongoose.Schema({
    paciente: {
        type: String,
        required: true
    },
    fecha: {
        type: Date,
        required: true
    },
    hora: {
        type: String,
        required: true
    },
    tipoConsulta: {
        type: String,
        required: false
    },
    motivo: {
        type: String,
        required: false
    },
    estado: {
        type: String,
        enum: ['Programada', 'En Proceso', 'Completada', 'Cancelada'],
        default: 'Programada'
    },
    notas: {
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

module.exports = mongoose.model('Cita', citaSchema);
