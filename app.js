/*
引入模块
*/
var Koa=require("koa"),
    router=require("koa-router")(),
    render=require("koa-art-template"),
    statics=require("koa-static"),
    bodyParser=require("koa-bodyparser"),
    path=require("path"),
    session=require("koa-session");

/*    
var UserModel=require("./model/collections/user.js") ;
var ArticleCateModel=require("./model/collections/articleCate.js") ;
var ArticleModel=require("./model/collections/article.js") ;

ArticleModel.aggregate([
    {
        $lookup:{
            from:"articleCate",
            localField:"c_id",
            foreignField:"_id",
            as:"articleCate"
        }
    },
    {
        $lookup:{
            from:"user",
            localField:"author_id",
            foreignField:"_id",
            as:"author"
        }
    }
],function(err,docs){
    if(err){
        console.log(err)
    }
    console.log(JSON.stringify(docs));
})*/
/*
mongodb 自定义类
*/
var db=require("./module/mongodb.js");
/*
实例化
*/
var app=new Koa();
/*
静态资料配置
*/
app.use(statics(path.join(__dirname,"static")));
/*
模板渲染
*/
render(app,{
    root:path.join(__dirname,"view"),
    extname:".html",
    debug:process.env.NODE_ENV!="production"
})
/*
传值参数解析
*/
app.use(bodyParser());
/*
应用中间件
*/
app.use(async function(ctx,next){
    await next();
    if(ctx.status==404){
        ctx.status=404;
        ctx.body="404 页面";
    }
})
/*
路由调用
*/
router.get("/",async function(ctx,next){
    let title="首页";
    //var table=await db.create("test");
    let result=await db.find("user",{});

    ctx.render("index",{
        title:title,
        result:result
    })
})
router.get("/add",async function(ctx,next){
    let title="添加";
    ctx.render("add",{
        title:title
    })
})
router.post("/doAdd",async function(ctx,next){
    let data=await db.insert("user",ctx.request.body);
    try{
        if(data.result.ok){
            ctx.redirect("/");
        }else{
            ctx.redirect("/add");
        }        
    }catch(err){
        ctx.redirect("/add");
    }
})
router.get("/edit",async function(ctx,next){
    let title="编辑";    
    let id=ctx.query.id;
    let data=await db.find("user",{"_id":db.getObjectId(id)});
    console.log(data);
    ctx.render("edit",{
        title:title,
        data:data[0]
    })
})
router.post("/doEdit",async function(ctx,next){
    let id=ctx.request.body._id;
    let username=ctx.request.body.username;
    let age=ctx.request.body.age;
    let sex=ctx.request.body.sex;
    console.log(ctx.request.body);
    let data=await db.update("user",{"_id":db.getObjectId(id)},{
        "username":username,
        "age":age,
        "sex":sex
    });
    try{
        if(data.result.ok){
            ctx.redirect("/");
        }else{
            ctx.redirect("/edit?id="+id);
        }        
    }catch(err){
        ctx.redirect("/edit?id="+id);
    }
})
router.get("/update",async function(ctx,next){
    let title="首添加";
    let result=await db.update("user",{"username":"list"},{"password":"list111111111"})
    console.log(result);
    // ctx.render("login",{
    //     title:title
    // })
})
router.get("/delete",async function(ctx,next){
    let id=ctx.query.id;
    let result=await db.delete("user",{"_id":db.getObjectId(id)})
    try{
        if(data.result.ok){
            ctx.redirect("/");
        }else{
            ctx.redirect("/");
        }        
    }catch(err){
        ctx.redirect("/");
    }
})
router.get("/login",async function(ctx,next){
    let title="首页";
    ctx.render("login",{
        title:title
    })
})
router.post("/doLogin",async function(ctx,next){
    ctx.body=ctx.request.body;
})
/*
路由配置
*/
app.use(router.routes());
app.use(router.allowedMethods());
/*
监听端口
*/
app.listen(3000,function(){
    console.log("http://127.0.0.1:3000");
})