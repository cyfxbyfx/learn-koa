var mongoose=require("mongoose");
/**
 * 连接数据库
 */
mongoose.connect("mongodb://cms:123456@127.0.0.1/cms",{useNewUrlParser:true,useUnifiedTopology:true},function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log("连接数据库成功");
});

module.exports=mongoose;
