import mongoose from "mongoose"

const connectDB = async (url) => {
    try{
        await mongoose.connect(url)
        console.log("Connected to DB..")
    } catch(error){
        console.error("Failed to connect to DB:", error)
    }
}

export default connectDB