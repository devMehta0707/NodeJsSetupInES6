// IMPORTING JWT MODULE

import jwt from 'jsonwebtoken';

// CREATING AUTHENTICATE MIDDLEWARE

async function authenticate(req,res,next){
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({code:401,msg:"Unauthorized"})
    }
    jwt.verify(token,process.env.SECRET_KEY,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(401).json({code:401,msg:"Invalid Token"})
        }
        req.body.userDetail = result;
        next();
    })
}

export default authenticate;