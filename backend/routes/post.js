const express = require('express');
const router = express.Router();
const Post = require('../modules/Post');

//Get back all the posts
router.get('/',async (req,res)=>{
    try {
        const posts = await Post.find();
        res.json(posts);
    }catch (err){
        res.json({message:err});
    }
});

//specific post
router.get('/:postID',async (req,res)=>{
    try {
        const post = await Post.findById(req.params.postID);
        res.json(post);
    }catch (err){
        res.json({message:err});
    }
})

//Submit post
router.post('/',async (req,res)=>{
    const post = new Post({
        title:req.body.title,
        description:req.body.description
    });
    try {
        const savedPost = await post.save();
        res.json(savedPost);
    }catch (err){
        res.json({message:err});
    }
});

//Delete Post
router.delete('/:postID',async (req,res)=>{
    try {
        const removedPost = await Post.remove({_id: req.params.postID});
        res.json(removedPost);
    }catch (err){
        res.json({message:err});
    }
})

//Update a post
router.patch('/:postID',async (req,res)=>{
    try {
        const updatePost = await Post.updateOne(
            {_id: req.params.postID},
            {$set:{title:req.body.title}}
        );
        res.json(updatePost);
    }catch (err){
        res.json({message:err});
    }
})
module.exports = router;
