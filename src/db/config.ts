import mongoose from "mongoose"
import "dotenv/config"


const connectDB = async () => {
    
    try {
        const URI = <string>process.env.DB_CNN

        await mongoose.connect(URI)
        console.log('Database connected')
    } catch (err) {
        console.log(err)
        throw new Error('Database connection error')
    }
}

export default connectDB