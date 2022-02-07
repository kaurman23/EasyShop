import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  const isSame = await bcrypt.compare(enteredPassword, this.password)
  return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function (next) {

  if (!this.isModified('password')) {
    next()
    return
  }
  this.password = bcrypt.hashSync(this.password, 10)
})

const User = mongoose.model('User', userSchema)

export default User
