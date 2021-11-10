const mongoose = require('mongoose');
const app = require('../app/app');
const PORT = 9000;
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.xdw47.mongodb.net/Cluster0?retryWrites=true&w=majority`,{
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ...`);
})
