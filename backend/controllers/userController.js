import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'

const userLogIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      email,
      name: user.name,
      _id: user._id,
      isAdmin: user.isAdmin,
      token: '',
    })
  } else {
    res.status(401)
    throw new Error('Invalid user email or password')
  }
})
export { userLogIn }
