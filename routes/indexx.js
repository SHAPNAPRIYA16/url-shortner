const express = require('express');
const router=express.Router();

const Url=require('../urls/model');

router.get('/:code',async(req,res)=>{
    try{
        const url=await Url.findOne({urlcode:req.params.code});
        if(url){
            return res.redirect(url.longurl);
        }
        else{
            return res.status(404).json('No url found');
        }
    }
    catch(err){
        console.error(err);
        res.status(500).json('Server Error');
    }
});
module.exports=router;
