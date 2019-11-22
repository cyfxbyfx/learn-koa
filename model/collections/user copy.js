var mongoose=require("../db.js");

var UserSchema=mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tel:{
        type:Number
    },
    sex:{
        type:Number,
        max:150,
        min:1
    },
    age:{
        type:Number
    },
    create_time:{
        type:Number,
        default:new Date().getTime()
    },
    update_time:{
        type:Number,
        default:new Date().getTime()
    }
});

module.exports=mongoose.model("User",UserSchema,"user");