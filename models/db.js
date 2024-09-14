const mongoose = require("mongoose");
const DB_URL = require("./config");

async function connectDB(){
    try {
        await mongoose.connect(
            DB_URL,
           {
            dbName:"learn-mongo-db",
           });
     console.log("we ate connected (:");
    } catch (e) {
        console.log(e);
    }
}

module.exports=connectDB;