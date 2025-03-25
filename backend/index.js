import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';

import userRouter from './routers/user.router.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(cors({ origin:  "http://localhost:5173" }));

app.use(
    session({
        secret: "NkoProductsSecretKeyWebApp",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, // Set to true in production (HTTPS)
            httpOnly: false, // change to true in production
            maxAge: 1000 * 60 * 60 * 24,
        },
    })
);


app.use(express.json());

app.use('/',userRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port} Database is connected`);
    });
}).catch((error) => {
    console.log('Error:', error.message);
});

