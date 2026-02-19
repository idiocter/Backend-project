import dotenv from 'dotenv';
dotenv.config();
import connectDB from './db/index.js';
import app from './app.js';

connectDB()
.then((req,res)=> {
    console.log('MongoDB connection established successfully');

    app.on('error', (error) => {
        console.error('Error:', error);
        throw error;
    });
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit the process with an error code
});

















// const connectDB = async () => {
//     try {
//         await mongoose.connect(`${process.env.MONOGODB_URI}`);
//         app.on('error', (error) => {
//             console.error('MongoDB connection error:', error);
//             throw error; // Rethrow the error to be caught by the catch block
//         });
//         console.log('Connected to MongoDB successfully');

//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT}`);
//         });
//     }
//     catch(error){
//         console.error('Error connecting to MongoDB:', error);
//     }
// }