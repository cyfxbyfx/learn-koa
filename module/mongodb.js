var mongoClient=require("mongodb").MongoClient;
var objectId=require("mongodb").ObjectID;
var Config=require("../model/config.js");

class mongodbClass{
    static getInstance(){
        if(!mongodbClass.instance){
            mongodbClass.instance=new mongodbClass();
        }
        return mongodbClass.instance;
    }
    constructor(){
        this.client="";
        this.connect();
    }
    connect(){
        let _that=this;
        return new Promise(function(resolve,reject){
            if(!_that.client){
                mongoClient.connect(Config.dbUrl,{useNewUrlParser:true,useUnifiedTopology: true },function(err,db){
                    if(err){
                        reject(err);
                        return;
                    }
                    _that.client=db.db(Config.dbName);
                    resolve(_that.client);
                })        
            }else{
                resolve(_that.client);
            }
        })
        
    }
    create(collectionName){
        let _that=this;

        return new Promise(function(resolve,reject){
            _that.connect().then(function(db){
                db.createCollection(collectionName,function(err,docs){
                    if(err){
                        reject(err);
                        return;
                    }
                    //console.log(docs);
                    resolve(docs);
                })
            })
        })
    }
    find(collectionName,json){
        let _that=this;
        /*this.connect().then(function(db){
            db.collection(collectionName).find(json).toArray(function(err,docs){
                if(err){
                    console.log(err);
                }
                console.log(docs);
            })
        })*/

        return new Promise(function(resolve,reject){
            _that.connect().then(function(db){
                db.collection(collectionName).find(json).toArray(function(err,docs){
                    if(err){
                        reject(err);
                        return;
                    }
                    //console.log(docs);
                    resolve(docs);
                })
            })
        })
    }
    insert(collectionName,json){
        let _that=this;

        return new Promise(function(resolve,reject){
            _that.connect().then(function(db){
                db.collection(collectionName).insertOne(json,function(err,docs){
                    if(err){
                        reject(err);
                        return;
                    }
                    //console.log(docs);
                    resolve(docs);
                })
            })
        })
    }
    update(collectionName,where,json){
        let _that=this;

        return new Promise(function(resolve,reject){
            _that.connect().then(function(db){
                db.collection(collectionName).updateOne(where,{$set:json},function(err,docs){
                    if(err){
                        reject(err);
                        return;
                    }
                    //console.log(docs);
                    resolve(docs);
                })
            })
        })
    }
    delete(collectionName,json){
        let _that=this;

        return new Promise(function(resolve,reject){
            _that.connect().then(function(db){
                db.collection(collectionName).deleteOne(json,function(err,docs){
                    if(err){
                        reject(err);
                        return;
                    }
                    //console.log(docs);
                    resolve(docs);
                })
            })
        })
    }
    getObjectId(id){
        return new objectId(id);
    }
}
module.exports=mongodbClass.getInstance();
/*
setTimeout(function(){
    console.time("start1");
    var m=mongodbClass.getInstance();
    m.find("user",{});
    console.timeEnd("start1")
    console.time("start2");
    var n=mongodbClass.getInstance();
    n.find("user",{});
    console.timeEnd("start2")
    console.time("start3");
    var x=mongodbClass.getInstance();
    x.find("user",{});
    console.timeEnd("start3")

},1000)*/
