import express from 'express'
import {
  registerUser,
  userLogIn,
  userProfile,
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', userLogIn)

router.route('/profile').get(protect, userProfile)

router.post('/register', registerUser)

export default router
