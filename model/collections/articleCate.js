var mongoose=require("../db.js");

var articleCateSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String
    }
});

module.exports=mongoose.model("ArticleCate",articleCateSchema,"articleCate");

/*
var articleCate=new ArticleCateModel({
    title:"33333",
    desc:"333333"
})  ;
articleCate.save(function(err,docs){
    if(err){
        console.log(err);
        return;
    }
    console.log(docs);
})
*/