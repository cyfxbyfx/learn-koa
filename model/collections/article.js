var mongoose=require("../db.js");

var ArticleSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author_name:{
        type:String,
        required:true
    },
    author_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    c_id:{
        type:mongoose.Schema.Types.ObjectId, 
        required:true      
    },
    desc:{
        type:String
    },
    conten:{
        type:String
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

module.exports=mongoose.model("Article",ArticleSchema,"article");

/*
var article=new ArticleModel({
    title:"444444444",
    author_name:"zhou1",
    author_id:"5dd60691c347fb34c0c888b9",
    c_id:"5dd607a2e63af3368014b081",
    desc:"444444444",
    conten:"444444444444",
})  ;
article.save(function(err,docs){
    if(err){
        console.log(err);
        return;
    }
    console.log(docs);
})*/