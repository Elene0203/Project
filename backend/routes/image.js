const express = require('express');
const router = express.Router();
const Image = require('../modules/Image');

router.get('/',async (req,res)=>{
    try {
        const image = await Image.aggregate([ { $sample: { size: 1 } } ] );
        res.json(image);
    }catch (err){
        res.json({message:err});
    }
})
