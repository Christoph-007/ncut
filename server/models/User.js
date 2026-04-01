const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const addressSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address1: String,
  address2: String,
  city: String,
  province: String,
  zip: String,
  country: String,
  phone: String,
})

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    addresses: [addressSchema],
    orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
    role: { type: String, enum: ['customer', 'admin'], default: 'customer' },
  },
  { timestamps: true }
)

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.passwordHash)
}

module.exports = mongoose.model('User', userSchema)
