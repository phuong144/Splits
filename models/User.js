const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    email : {
        type: String,
        required: true,
        unique: 1,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
    },
    split:{
        type:String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});
/*

let SALT = 10;
userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')) {
        bcrypt.genSalt(SALT, function(err, salt){
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return  next(err);
                user.password = hash;
                next();
            })
        })
    } else {
        next();
    }
})

userSchema.methods.comparePassword = function(candidatePassword, checkpassword){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if(err) return checkpassword(err);
        checkpassword(null, isMatch)
    })
}
*/


module.exports = User = mongoose.model("users", UserSchema);