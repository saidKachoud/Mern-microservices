// here will stock the login function and register

const User = require("../models/User")

const registerUser = async (req, res)=>{
    try{
        const { username, fullName, email, password,  } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "User already exists" });

        const existingUserName = await User.findOne({ username });
        if (existingUserName) return res.status(400).json({ message: "UserName already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            fullName,
            email,
            password: hashedPassword,
            
        });

        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    }catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
}
const login = async (req, res) => {
    try{
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { userId: user._id, userName:user.username },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        res.json({ token, user: { id: user._id, name: user.name, email: user.email, userName: user.userName } });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
      }
}
module.exports = { registerUser, login };
