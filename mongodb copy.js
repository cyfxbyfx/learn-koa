var Config=require("./model/config");
var MongoClient=require("mongodb").MongoClient;

class mongodbClass{
    static getInstance(){   
        if(!mongodbClass.instance){
            return new mongodbClass();
        }else{
            return mongodbClass.instance;
        }
    }
    constructor(){
        this.client="";
        this.connect();
        console.log(this.client);
    }
    connect(){
        let _that=this;        
        return new Promise(function(resolve,reject){
            if(!_that.client){
                MongoClient.connect(Config.dbUrl,{useNewUrlParser:true,useUnifiedTopology:true},function(err,conn){
                    if(err){
                        reject(err);
                    } 
                    _that.client=conn.db(Config.dbName);
                    resolve(_that.client);
                })
            }else{
                resolve(_that.client);
            }
        })    
                      
    }
    find(collectionName,json){
        let _that=this;
        console.log(this);
        return new Promise((resolve,reject)=>{
            this.connect().then(function(db){
                db.collection(collectionName).find(json).toArray(function(err, docs) { // 返回集合中所有数据

                    if(err){
                        reject(err);
                    }
                    resolve(docs);
                });
            })
        })
    }
    update(collection,json){        
    }
    delete(collection,json){        
    }
}
async function test(){
    console.time("start1");
    var a=mongodbClass.getInstance();
    a.find("user");
    console.timeEnd("start1");
    console.time("start2");
    var b=mongodbClass.getInstance();
    b.find("user");
    console.timeEnd("start2");
    console.time("start3");
    var c=mongodbClass.getInstance();
    c.find("user");
    console.timeEnd("start3");
}
test();


/*
console.time("start1");
var a=mongodbClass.getInstance();
a.find("user");
console.timeEnd("start1");
console.time("start2");
var b=mongodbClass.getInstance();
b.find("user");
console.timeEnd("start2");
console.time("start3");
var c=mongodbClass.getInstance();
c.find("user");
console.timeEnd("start3");*/