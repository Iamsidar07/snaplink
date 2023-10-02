import mongoose, { ConnectOptions } from 'mongoose';

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);
    if (isConnected) {
        console.log('allready connected to database');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || '', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        } as ConnectOptions);
        isConnected = true;
        console.log('connected to database');
    } catch (error) {
        console.error(error);
    }
};

export default connectToDatabase;