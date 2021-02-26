const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxlength: [500, 'your name cannot exceed 500 characters']
    },
    email: {
        type: String,
        required: [true, 'please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'please enter valid email address']
    },
    password: {
        type: String,
        required: [true, 'Your password must be longer than 6 characters'],
        minlength: 6,
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
});

//Encrypt the password before Save
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});

//compare user password
userSchema.methods.ComparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

//Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    });
}

//Generate Password reset token
userSchema.methods.getResetPasswordToken = function () {
    //Genearte Token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // We should encrypt the token, it not good practise to send without encryption
    // TODO Very important
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    //Set token expired time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model('user', userSchema);