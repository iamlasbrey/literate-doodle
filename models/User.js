const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true, // Makes this field mandatory
      trim: true, // Removes whitespace around the name
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures no duplicate email addresses
      lowercase: true, // Converts email to lowercase
      trim: true,
      match: [/.+@.+\..+/, 'Invalid email address'], // Email validation regex
    },
    password: {
      type: String,
      required: true,
      minlength: 8, // Enforces minimum password length
    },
    avatar: {
      type: String, // URL to the user's avatar/profile picture
      default: '', // Optional
    },
    dateOfBirth: {
      type: Date,
    },
    isActive: {
      type: Boolean,
      default: true, // Indicates if the user account is active
    },
    roles: {
      type: [String], // Array of roles (e.g., ['user', 'admin'])
      default: ['user'],
    },
  },
  {
    timestamps: true, // Adds `createdAt` and `updatedAt` fields automatically
  }
);

module.exports = mongoose.model('User', userSchema);
