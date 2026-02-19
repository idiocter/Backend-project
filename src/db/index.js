import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const connectDB = async () => {

    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`);
        console.log(`MongoDB connected successfully to ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection error", error);
        
    }
}

export default connectDB;