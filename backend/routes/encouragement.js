const express = require('express');
const router = express.Router();
const Encouragement = require('../modules/Encouragement');

router.get('/',async (req,res)=>{
    try {
        const encourage = await Encouragement.aggregate([ { $sample: { size: 1 } } ] );
        res.json(encourage);
    }catch (err){
        res.json({message:err});
    }
})


module.exports = router;
