const express = require('express');
const router = express.Router();
const Encouragement = require('../modules/Encouragement');
const Image = require('../modules/Image');

router.get('/',async (req,res)=>{
    try {
        const encourage = await Encouragement.aggregate([ { $sample: { size: 1 } } ] );
        res.json(encourage);
    }catch (err){
        res.json({message:err});
    }
})

router.get('/image',async (req,res)=>{
    try {
        const image = await Image.aggregate([ { $sample: { size: 1 } } ] );
        res.json(image);
    }catch (err){
        res.json({message:err});
    }
});

// //Submit post
// router.post('/',async (req,res)=>{
//     const post = new Encouragement({
//         content:req.body.content,
//     });
//     try {
//         const savedPost = await post.save();
//         res.json(savedPost);
//     }catch (err){
//         res.json({message:err});
//     }
// });

module.exports = router;
