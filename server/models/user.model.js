
// near the top is a good place to group our imports
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");


const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minlength: [2, "First name must be 2 characters or longer"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minlength: [2, "Last name must be 2 characters or longer"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already taken"],
        validate: {
            validator: val => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
            message: "Please enter a valid email"
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [4, "Password must be 4 characters or longer"]
    }
}, { timestamps: true, versionKey: false });

// add this after UserSchema is defined
UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set(value => this._confirmPassword = value);

UserSchema.pre('validate', function (next) {
    console.log(this.confirmPassword);
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;
            next();
        });
});

module.exports.User = mongoose.model("usuarios", UserSchema);

