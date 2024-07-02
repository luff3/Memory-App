import connectToMongoDB from "./Db/connectToMongoDb.js";
import express from "express"
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoter from './Routes/userRoutes.js'
import memoryRoter from './Routes/memoryRoutes.js'

dotenv.config();

const app = express();

app.use(cookieParser());


const corsOptions = {
    origin: 'http://localhost:5173', // замініть на ваш домен
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/users', authRoter)
app.use('/memories', memoryRoter)


const port = 3000;

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server listening on port ${port}`);
    console.log(`Server URL: http://localhost:${port}`);
});