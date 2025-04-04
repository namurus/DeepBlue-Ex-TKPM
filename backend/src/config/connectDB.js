import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connect to database successfully");
    } catch (err) {
        console.error("Connect to database failed");
        console.error(err);
        process.exit(1); // 
    }
};

module.exports = connectDB;