import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to DB ${connect.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
