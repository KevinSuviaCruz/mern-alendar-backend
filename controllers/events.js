const { response } = require('express')
const Evento = require('../models/Evento')

const getEvents = async (req, res = response) => {
  // Llamamos a la base de datos y extraemos todos los datos. Tambien especificamos que en "user" quiero solo al dato de name
  // El id viene por defecto hay que especificarlo para que no venga
  const eventos = await Evento.find()
    .populate('user', 'name')

  res.json({
    ok: true,
    eventos
  })
}
const createEvents = async (req, res = response) => {
  const evento = new Evento(req.body)
  try {
    evento.user = req.uid
    const eventSave = await evento.save()
    res.status(201).json({
      ok: true,
      event: eventSave
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}
const updateEvent = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId)
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      })
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de editar este evento'
      })
    }
    const nuevoEvento = {
      ...req.body,
      user: uid
    }
    // { new: true } lo usamos para que cuando actualizemos el evento nos lo muestre actualizado
    // Si no usamos { new: true } nos va a devolver el elemento viejo y solo lo actualizara en la base de datos
    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true })
    res.json({
      ok: true,
      evento: eventoActualizado
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}
const deleteEvent = async (req, res = response) => {
  const eventoId = req.params.id
  const uid = req.uid

  try {
    const evento = await Evento.findById(eventoId)
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: 'Evento no existe por ese id'
      })
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: 'No tiene privilegio de eliminar este evento'
      })
    }

    await Evento.findByIdAndDelete(eventoId)
    res.json({
      ok: true
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = { getEvents, createEvents, updateEvent, deleteEvent }
