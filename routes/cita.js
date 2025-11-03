const express = require("express");
const router = express.Router();
const {
    getCitas,
    getCitaById,
    createCita,
    updateCita,
    deleteCita,
    getCitasByDate
} = require('../controllers/citaController');

// Rutas para citas
router.get('/', getCitas);
router.get('/fecha/:fecha', getCitasByDate);
router.get('/:id', getCitaById);
router.post('/', createCita);
router.put('/:id', updateCita);
router.delete('/:id', deleteCita);

module.exports = router;
