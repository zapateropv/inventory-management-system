import { checkAuth } from '../middleware/auth.js'
import express from 'express'
import { register, login, dashboard } from '../controller/controller.js'

export const router = express.Router()


router.post('/register', register)
router.post('/login', login)

router.get('/dashboard', checkAuth, dashboard)