const express = require("express");
const router = express.Router();

/** @type {import("mongoose").Model<any>} */
const URL = require("../models/urlModel"); 

router.get('/',async (req,res)=>{
    if(!req.user){
        return res.redirect("/login");
    }
    const createdBy = req.user._id
    const allUrls = await URL.find({createdBy : createdBy})
    return res.render('home',{
        urls : allUrls
    })
})

router.get('/signup',(req,res)=>{
    return res.render("signup");
})

router.get('/login',(req,res)=>{

    return res.render("login");
})

module.exports = router;