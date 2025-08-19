
/** @type {import("mongoose").Model<any>} */
const URL = require("../models/urlModel"); 
const {nanoid} = require("nanoid");

async function generateShortId(req,res){
    const bodyUrl = req.body.url;
    if(!bodyUrl){
        return res.status(400).json({msg:"Body Url not sent."});
    }
    const shortId = nanoid(8);
    await URL.create({
        shortId : shortId,
        redirectUrl : bodyUrl,
        visitHistory : []
    });
    return res.render("home",{
        id : shortId
    });
}

async function getUrlfromId(req,res){
    const id = req.params.id;
    const urlObject = await URL.findOneAndUpdate({shortId: id},
        {$push : {visitHistory : {visitedAt : new Date()}}},
        {new:true}
    );
    if(!urlObject){
        return res.status(404).send(`ID : ${id} not found.`);
    }    
    return res.redirect(urlObject.redirectUrl);
}

async function getAnalyticsfromId(req,res){
    const id = req.params.id;
    const obj = await URL.findOne({shortId : id});
    return res.json({noOfClicks : obj.visitHistory.length,
                     CreatedAt : obj.createdAt.toLocaleString("en-GB"),
                     analytics : obj.visitHistory
    })
}


module.exports = {
    generateShortId,
    getUrlfromId,
    getAnalyticsfromId
};