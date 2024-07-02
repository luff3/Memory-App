import jwt from "jsonwebtoken"

export const cookieAuthJwt = (req, res, next) => {

    const token = req.cookies.token;
    console.log("in cookie", token);
    try {
        const user = jwt.verify(token, process.env.MY_SECRET);
        req.user = user;
        next();

    } catch (error) {
        res.clearCookie("token");
        console.log(error);
    }
}