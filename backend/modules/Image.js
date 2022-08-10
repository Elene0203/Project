const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    category:{
        type:String,
        requires:true
    },
    url:{
        type:String,
        requires:true
    }
})

module.exports=mongoose.model('images',ImageSchema);
