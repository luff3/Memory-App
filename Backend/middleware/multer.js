
import multer from "multer";

const upload = multer({ dest: "uploads/" }).single('myimage');

export const uploadMiddleware = (req, res, next) => {
    upload(req, res, (err) => {
        if (err) {
            console.log("FUCK", err);
            return res.status(400).json({ error: err.message });
        }
        next();
    });
};
