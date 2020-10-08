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
    account_name:String,
    contents:String,
    filename_image:String,
    time:Date,
});
const Post = mongoose.model("post",PostSchema);

const post_db = {
    Post:Post,
}

module.exports = post_db;



