/*
Event Routes
/api/routes
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { validateJWT } = require('../middlewares/validar-jwt')
const { getEvents, createEvents, updateEvent, deleteEvent } = require('../controllers/events')
const { validFields } = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')

const router = Router()

// Todas tienen que pasar por la validacion del JWT
// al llamarlo aca cualquier peticion que pase abajo de esté tendra que primero llamara a esta funcion y luego a la peticion
router.use(validateJWT)

router.get('/', getEvents)
router.post('/', [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'Fecha de inicio en obligatorio').custom(isDate),
  check('end', 'Fecha final es obligatorio').custom(isDate),
  validFields
], createEvents)
router.put('/:id', [
  check('title', 'El titulo es obligatorio').not().isEmpty(),
  check('start', 'Fecha de inicio en obligatorio').custom(isDate),
  check('end', 'Fecha final es obligatorio').custom(isDate),
  validFields
], updateEvent)
router.delete('/:id', deleteEvent)

module.exports = router
