const Cita = require('../models/Cita');

// Obtener todas las citas del usuario actual
exports.getCitas = async (req, res) => {
    try {
        const { usuario } = req.query; // Recibir usuario desde query params
        const citas = await Cita.find({ creadoPor: usuario });
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener una cita por ID
exports.getCitaById = async (req, res) => {
    try {
        const cita = await Cita.findById(req.params.id);
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada' });
        }
        res.json(cita);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una nueva cita
exports.createCita = async (req, res) => {
    const { paciente, fecha, hora, tipoConsulta, motivo, estado, notas, creadoPor } = req.body;
    const cita = new Cita({
        paciente,
        fecha,
        hora,
        tipoConsulta,
        motivo,
        estado,
        notas,
        creadoPor
    });
    
    try {
        await cita.save();
        res.status(201).json(cita);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Actualizar una cita (solo del usuario actual)
exports.updateCita = async (req, res) => {
    const { id } = req.params;
    const { paciente, fecha, hora, tipoConsulta, motivo, estado, notas, creadoPor } = req.body;
    
    try {
        // Verificar que la cita pertenece al usuario actual
        const cita = await Cita.findOne({ _id: id, creadoPor: creadoPor });
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada o no autorizada' });
        }
        
        const citaActualizada = await Cita.findByIdAndUpdate(
            id,
            { paciente, fecha, hora, tipoConsulta, motivo, estado, notas },
            { new: true }
        );
        
        res.status(200).json(citaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Eliminar una cita (solo del usuario actual)
exports.deleteCita = async (req, res) => {
    const { id } = req.params;
    const { creadoPor } = req.body;
    
    try {
        // Verificar que la cita pertenece al usuario actual
        const cita = await Cita.findOne({ _id: id, creadoPor: creadoPor });
        if (!cita) {
            return res.status(404).json({ message: 'Cita no encontrada o no autorizada' });
        }
        
        await Cita.findByIdAndDelete(id);
        res.status(200).json({ message: 'Cita eliminada exitosamente' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obtener citas por fecha
exports.getCitasByDate = async (req, res) => {
    try {
        const { fecha } = req.params;
        const { usuario } = req.query;
        const citas = await Cita.find({ fecha: fecha, creadoPor: usuario });
        res.json(citas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
