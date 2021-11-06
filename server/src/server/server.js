const mongoose = require('mongoose');
const app = require('../app/app');
const PORT = 9000;

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://quancd1:Lucas013514771@cluster0.xdw47.mongodb.net/Cluster0?retryWrites=true&w=majority',{
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
