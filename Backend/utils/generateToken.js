import jwt from "jsonwebtoken";

const generateToken = (user, res) => {
    const payload = {
        id: user._id,  
        username: user.username,
    };

	const token = jwt.sign(payload, process.env.MY_SECRET, {
		expiresIn: "30d",
	});

	console.log("Generate", token);
	res.cookie("token", token, {
		maxAge: 30 * 24 * 60 * 60 * 1000, // MS
		httpOnly: true, 
	});
};

export default generateToken;