const mongoose = require("mongoose");
const DB_URL = require("./config");

async function connectDB(DB_URL){
    try {
        await mongoose.connect(
            DB_URL,
           {
            dbName:"social_app",
           }
       );
     console.log("we ate connected (:");
    } catch (e) {
        console.log(e);
    }
}

module.exports=connectDB;