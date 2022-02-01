import express from 'express'
import {
  registerUser,
  userLogIn,
  userProfile,
  updateUserProfile
} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/login', userLogIn)

router.route('/profile').get(protect, userProfile).put(protect,updateUserProfile)

router.post('/register', registerUser)


export default router
