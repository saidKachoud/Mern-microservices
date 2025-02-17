const jwt = require("jsonwebtoken")
require("dotenv").config()

const isAuthenticated = (request,response,next) =>{
    try{
        const token = request.headers['Authorization']?.split(' ')[1];

        if(!token){
            return response.status(401).json({
                'message' : 'Unauthorized'
            })
        }

        jwt.verify(token,process.env.SECRET_KEY, (error,user)=>{
            if(error){
                return response.status(401).json({
                    'message' : 'Invalid token'
                })
            }

            request.user = user;
            next();
        });
    }catch(error){
        return response.status(500).json({
            'message' : error.message
        })
    }
}

module.exports = isAuthenticated;