const mongoose = require('mongoose');

const EncouragementSchema = mongoose.Schema({
    content:{
        type:String,
        requires:true
    }
})

module.exports=mongoose.model('Encouragements',EncouragementSchema);
