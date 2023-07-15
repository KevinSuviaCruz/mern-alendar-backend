/*
Rutas de Usuarios / auth
host + /api/auth
*/

const { Router } = require('express')
const { check } = require('express-validator')

const { createUser, loginUser, revalidateToken } = require('../controllers/auth')
const { validFields } = require('../middlewares/validar-campos')
const { validateJWT } = require('../middlewares/validar-jwt')

const router = Router()

router.post('/new',
  [ // midlewares
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validFields
  ],
  createUser
)

router.post('/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
    validFields
  ],
  loginUser
)

router.get('/renew', validateJWT, revalidateToken)

module.exports = router
