const express = require('express'); 
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

//Servidor Http
const app = express(); 

//Configuraciones Http
app.use(bodyParser.json()); 
app.use(cors()); 
 
// Conectar a MongoDB 
mongoose.connect(procces.env.MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=> console.log("Conexión a MongoDB exitosa")) 
    .catch(err => console.error("Error al conectar a MongoDB", err));

 
// Rutas de la API

//Rutas para autenticación
const authRoutes = require('./routes/auth'); 
app.use('/api/auth', authRoutes); 

//Rutas para pacientes
const pacientesRoutes = require('./routes/paciente');
app.use('/api/pacientes', pacientesRoutes);

 
//configurar puerto para backend
const port = process.env.PORT || 5000; 
app.listen(port, () => { 
    console.log(`Servidor ejecutándose en el puerto ${port}`); 
});