const express = require('express');
const mongoose = require('mongoose');
const app = express();

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
app.use('/home', (req,res) => {
    res.send('hello');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
})