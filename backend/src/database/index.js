import mongoose from "mongoose";

// connect to mongoDB

const connectDB = async () => {
    mongoose.connect(process.env.DB_CONNECTION_STRING).then((connection) => {
        console.log("MongoDB connection successfull", connection.connection.host)
    }).catch((error) => {
        console.log("MongoDb connection error", error.message)
    })

}

export default connectDB