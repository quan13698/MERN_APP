const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
   title: {
       type: String,
       required: true,
   },
   description: {
       type: String,
   },
   url: {
       type: String,
   },
   status: {
       type: String,
       enum: ['TO LEARN','LEARNING', 'LEARNT']
   },
   user: {
       type: Schema.Types.ObjectId,
       ref: 'user'
   }
})
module.exports = mongoose.model('posts', postSchema);