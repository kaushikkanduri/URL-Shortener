
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
    return res.status(201).json({msg:`Short-ID : ${shortId}`});
}


module.exports = {
    generateShortId
};