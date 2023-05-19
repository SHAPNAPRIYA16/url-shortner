const express= require('express');
const router= express.Router();
const validurl=require('valid-url');
const shortid=require('shortid');
const config =require('config');

const Url=require('../urls/model');

router.post('/shorten',async(req,res)=>{
    const {longurl}=req.body;
    const baseurl=config.get('baseurl');
    
    if(!validurl.isUri(baseurl)){
        return res.status(401).json('Invalid base url');
    }
    const urlcode=shortid.generate();
    if(validurl.isUri(longurl)){
        try{
            let url=await Url.findOne({longurl});
            if(url){
                res.json(url);
            }
            else{
                const shorturl=baseurl+'/'+urlcode;
                url=new Url({
                    longurl,
                    shorturl,
                    urlcode,
                    date:new Date()
                });
                await url.save();
                res.json(url);

            }
        }
        catch(err){
            console.error(err);
            res.status(500).json("Server Error");
        }
    }
    else{
        res.status(401).json('Invalid Long Url');
    }
});
module .exports=router;
