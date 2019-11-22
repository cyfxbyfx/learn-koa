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
    },
    age:{
        type:Number,
        max:150,
        min:1
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

/*
var user=new UserModel({
    username:"zhou",
    password:"zhou",
    tel:13590259452,
    sex:1,
    age:30,
})  ;
user.save(function(err,docs){
    if(err){
        console.log(err);
        return;
    }
    console.log(docs);
})
UserModel.find({},function(err,docs){
    if(err){
        console.log(err);
        return;
    }
    console.log(docs);
})
UserModel.updateOne({"username":"zhou"},{"sex":0},function(err,docs){
    if(err){
        console.log(err);
        return;
    }
    console.log(docs);
})*/