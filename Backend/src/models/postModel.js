
const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description:{type:String, default:''},
    image:{type:String, require:true},
    comments:[{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        date:{type:String, required:true},
        comment:{type:String, required:true},
    }],
    likes:[{
        user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        date:{type:String, required:true},
    }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },

},{timestamps: true})

const PostModel = mongoose.model('posts', postSchema)

module.exports = PostModel