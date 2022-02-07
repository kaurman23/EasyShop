import express from 'express'
import {
  registerUser,
  userLogIn,
  userProfile,
  updateUserProfile,
  getUsers,
  deleteUser
} from '../controllers/userController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, admin, getUsers)

router.post('/login', userLogIn)

router
  .route('/profile')
  .get(protect, userProfile)
  .put(protect, updateUserProfile)

router.post('/register', registerUser)

router.route('/:id').delete(protect, admin, deleteUser)

export default router
