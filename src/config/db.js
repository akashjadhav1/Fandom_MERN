const mongoose = require('mongoose');






const db = async()=>{
    const mongo_url = process.env.MONGO_URI
    try {
        await mongoose.connect(mongo_url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("connected to mongodb database")
    } catch (error) {
        console.log("error connecting to mongodb database",error)
    }
}


module.exports = db;