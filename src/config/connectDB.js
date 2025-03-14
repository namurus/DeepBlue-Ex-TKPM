import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://thaidinhngan:GViyGm7n695luMEr@cluster0.2pn7q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Connect to database successfully");
    } catch (err) {
        console.error("Connect to database failed");
        console.error(err);
        process.exit(1); // 
    }
};

module.exports = connectDB;