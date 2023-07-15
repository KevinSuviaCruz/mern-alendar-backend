const express = require('express')
const { dbConnection } = require('./database/config')
// Instalando el paquete dotenv
require('dotenv').config()
const cors = require('cors')

// Crear el servidor de express
const app = express()

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Lectura y parseo del body
app.use(express.json())

// Directoria público
app.use(express.static('public'))

// Rutas
// TODO: auth // crear,login,renew
app.use('/api/auth', require('./routes/auth'))
// TODO: CRUD // Eventos
app.use('/api/events', require('./routes/events'))

// Escuchar peticiones
app.listen(process.env.PORT, () => {
  console.log(`Servido corriendo en puerto ${process.env.PORT}`)
})
