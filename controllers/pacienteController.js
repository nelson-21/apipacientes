//importando el modelo de Paciente
const Paciente = require('../models/Paciente');

//Funcion para traer todos los pacientes del usuario actual
exports.getPacientes = async (req, res) => {
    try {
        const { usuario } = req.query; // Recibir usuario desde query params
        const pacientes = await Paciente.find({ creadoPor: usuario });
        res.json(pacientes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Funcion para crear un nuevo paciente
exports.addPaciente = async (req, res) => {
    const { nombre, fechaNacimiento, telefono, direccion, correoElectronico, creadoPor } = req.body;
    const paciente = new Paciente({ 
        nombre, 
        fechaNacimiento, 
        telefono, 
        direccion, 
        correoElectronico,
        creadoPor
    });
    try {
        await paciente.save();
        res.status(201).json(paciente);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Función para actualizar un paciente (solo del usuario actual)
exports.updatePaciente = async (req, res) => {
    const { id } = req.params;
    const { nombre, fechaNacimiento, telefono, direccion, correoElectronico, creadoPor } = req.body;
    try {
        // Verificar que el paciente pertenece al usuario actual
        const paciente = await Paciente.findOne({ _id: id, creadoPor: creadoPor });
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado o no autorizado' });
        }
        
        const pacienteActualizado = await Paciente.findByIdAndUpdate(
            id, 
            { nombre, fechaNacimiento, telefono, direccion, correoElectronico }, 
            { new: true }
        );
        res.status(200).json(pacienteActualizado);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Function para eliminar un paciente (solo del usuario actual)
exports.deletePaciente = async (req, res) => {
    const { id } = req.params;
    const { creadoPor } = req.body;
    try {
        // Verificar que el paciente pertenece al usuario actual
        const paciente = await Paciente.findOne({ _id: id, creadoPor: creadoPor });
        if (!paciente) {
            return res.status(404).json({ message: 'Paciente no encontrado o no autorizado' });
        }
        
        await Paciente.findByIdAndDelete(id);
        res.status(200).json({ message: 'Paciente eliminado' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}