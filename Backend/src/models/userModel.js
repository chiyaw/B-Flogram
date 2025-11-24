
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user: {type: String, unique:true},
    password:{type: String, required: true},
    privateAccount:{type:Boolean, required: false, default: false},
    bio:{type: String, required:false, default: ''},
    followings:[{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    followers:[{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    profilePic: {type:String, required:false, default:null},

},{timestamps: true})

const UserModel = mongoose.model('users', userSchema)

module.exports = UserModel