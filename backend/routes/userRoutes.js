import express from 'express'
import {
  userLogIn
} from '../controllers/userController.js'

const router = express.Router()

router.post('/login', userLogIn)

export default router
