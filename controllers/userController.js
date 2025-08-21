/** @type {import("mongoose").Model<any>} */
const USER = require("../models/userModel");
const {setUser} = require("../service/auth");


async function userSignUp(req,res){
    const {name,email,password} = req.body;
    USER.create({
        name,email,password
    });
    return res.redirect('/login');
}

async function userLogin(req,res){
    const {email,password} = req.body;
    const user = await USER.findOne({email,password});
    if(!user)
        return res.render('login',{error : "Invalid credentials"});
    const token = setUser(user);
    res.cookie("uid",token);
    return res.redirect('/');
}


module.exports = {
    userSignUp,
    userLogin
}