const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
require("dotenv").config()

let invalidTokens = new Set();

const login = async (request, response) => {
    try{
        const { email, password } = request.body;        

        const user = await User.findOne({ email });
        if (!user) return response.status(400).json({ message: "Invalid credentials" });

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) return response.status(400).json({ 
            message: "Invalid credentials" 
        });

        const token = jwt.sign(
            { userId: user._id, userName:user.username,userEmail: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "24h" }
        );

        response.json({ 
            token, 
            user: { id: user._id,
                name: user.name,
                email: user.email,
                userName: user.userName
            }
        });

    } catch (error) {
        response.status(500).json({ 
            message: error.message ,
        });
      }
}


const registerUser = async (request, response)=>{
    try{
        const { username, fullName, email, password,  } = request.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return response.status(400).json({ 
            message: "User already exists" 
        });

        const existingUserName = await User.findOne({ username });
        if (existingUserName) return response.status(400).json({ 
            message: "UserName already exists" 
        });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        response.status(200).json({ 
            message: "User registered successfully" 
        });
    }catch (error) {
        response.status(500).json({ 
            message: error.message, 
        });
      }
}


const logout = (request,response) =>{

    const token = request.headers['authorization'].split(' ')[1];
    if(!token){
        return response.status(401).json({
            'message' : 'No token provided'
        })
    }
    invalidTokens.add(token);
    return response.json({
        'message' : 'Logged out suucessfully!'
    });
}
module.exports = { login ,registerUser , logout };
