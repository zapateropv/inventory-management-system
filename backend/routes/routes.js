import { checkAuth } from '../middleware/auth.js'
import express from 'express'
import { register, login, refreshNewToken,dashboard, checkRoute } from '../controller/controller.js'

export const router = express.Router()


router.post('/register', register)
router.post('/login', login)
router.post('/refresh', refreshNewToken)


router.get('/me', checkAuth, checkRoute)
router.get('/dashboard',checkAuth, dashboard)