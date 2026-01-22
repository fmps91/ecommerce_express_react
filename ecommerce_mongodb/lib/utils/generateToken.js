const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId,username,res)=>{
    //console.log("userId: ",userId,"username: ",username)
    const token=jwt.sign({userId},process.env.JWTSecret,{
        expiresIn:'15d'
    })

    //console.log("token : ",token)
    //const decoded =  jwt.verify(token,process.env.JWTSecret);  
    //console.log("decoded : ",decoded)

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000,
        httpOnly: true, //prevent xsss attacks cross-site scripting atacks
        sameSite: "strict", // CSRF attacks cross-site request forgery attacks
        secure: process.env.NODE_ENV !== "development",
    })
}

module.exports = {generateTokenAndSetCookie}