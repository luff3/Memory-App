import User from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import generateToken from "../utils/generateToken.js";

export const signup = async (req, res) => {
    const { username, password, gender } = req.body;

    try {
        if (!username || !password || !gender) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).send({ error: 'Username already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({ username, password: hashedPassword, gender });
        generateToken(newUser, res);

        await newUser.save();

        res.status(201).send(newUser);
    } catch (error) {
        if (error.code === 11000) { 
            res.status(400).send({ error: 'Username already exists' });
        } else {
            res.status(500).send({ error: 'Internal Server Error' });
        }
    }
};


export const login = async (req, res) =>  {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        const passwordMatch = await bcrypt.compare(password, user?.password || "");

        if (passwordMatch) {
            generateToken(user, res);
            res.status(200).send({message: 'Happy'})
        } else {
            res.status(401).send({message: 'Incorrect'})
        }
    } catch (error) {
        console.error('Authefication error:', error);
        res.status(500).send({message: 'Internal server error'})
    }
}


export const logout = (req, res) => {
	try {
		res.cookie("token", "", { maxAge: 0 });
		res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.log("Error in logout controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};