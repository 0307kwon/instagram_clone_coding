const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://0307kwon:12345@cluster0.etajt.mongodb.net/instagram_clone_coding?retryWrites=true&w=majority`,
{ useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on(`error`, console.error.bind(console, "connection error"));
db.once(`open`, ()=>{
  console.log("DB connected");
});

const PostSchema = mongoose.Schema({
    title:String,
    contents:String,
    filename_image:String,
    time:Date,
});
const Post = mongoose.model("post",PostSchema);

const post_db = {
    Post:Post,
}

module.exports = post_db;


/*
const { MongoClient, ObjectId } = require("mongodb");
const { mountpath } = require("../app");


const dbName = "instagram_clone_coding";
const post_col = "posts";
const url = "mongodb+srv://0307kwon:12345@cluster0.etajt.mongodb.net/instagram_clone_coding?retryWrites=true&w=majority";

const post_export = {
    insertDB:insertDB,
    listDB:listDB,
    readDB:readDB,
};

let client;

async function listDB(){ // 리스트를 리턴
    try {
        client = initClient();
        await client.connect();
        console.log("Connected correctly to server");

        const database = client.db(dbName);
        const collection = database.collection(post_col);
    
        const query = { };
    
        const options = {
          sort: { title: 1 },
          projection: {title: 1,},
        };
        const cursor = collection.find(query, options);
    
        // print a message if no documents were found
        if ((await cursor.count()) === 0) {
          console.log("No documents found!");
        }

        const post_list = []

        await cursor.forEach((doc)=>{
            post_list.push(doc);
            return;
        });
        return post_list;
    }catch(err){
          console.log(err);
    } finally {
        await client.close();
    }
};

async function readDB(post_id){ // 포스트를 리턴
    try {
        client = initClient();
        await client.connect();
        console.log("Connected correctly to server");

        const database = client.db(dbName);
        const collection = database.collection(post_col);
    
        const query = {
            _id:ObjectId(post_id),
        };
    
        const options = {
          sort: { title: 1 },
          projection: {title: 1,contents: 1,image_url: 1},
        };
        const post = await collection.findOne(query,options);
        console.log(post._id);
        return post;
    }catch(err){
          console.log(err);
    } finally {
        await client.close();
    }
};

async function insertDB(title,contents,image_url) {
    try {
        client = initClient();

        await client.connect();
        console.log("Connected correctly to server");

        const db = client.db(dbName);
        const col = db.collection(post_col);

        let postDocument = {
            "title":title,
            "contents":contents,
            "image_url":image_url,
            "time":new Date(),
        }

        const p = await col.insertOne(postDocument);
        const myDoc = await col.findOne();
        console.log(myDoc.title);
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}

function initClient(){
    return new MongoClient(url,{
        useUnifiedTopology: true,
        poolSize: 100,
    });
}

module.exports = post_export;
*/






