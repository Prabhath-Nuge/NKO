import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import userRouter from './routers/user.router.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Your frontend URL
    credentials: true, // Allow cookies to be sent
}));

app.use(
    session({
        secret: process.env.SESSION_SEC_KEY,
        resave: false,  // Do not save unchanged sessions
        saveUninitialized: false,  // Do not create empty sessions
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            ttl: 14 * 24 * 60 * 60,  // Session expires in 14 days
            autoRemove: 'native',
        }),
        cookie: {
            secure: false,  // Must be `false` for local testing (HTTPS required for `true`)
            httpOnly: false, // Allow frontend JS to access cookies (optional)
            sameSite: "lax", // Ensures cookies work across different origins
            maxAge: 1000 * 60 * 60 * 24, // 1 day
        },
    })
);






app.use('/',userRouter);
app.get('/test-session', (req, res) => {
    if (!req.session.views) {
        req.session.views = 1;
    } else {
        req.session.views++;
    }
    res.json({ views: req.session.views });
});
app.get('/test-session1', (req, res) => {
    
    res.json({ views: req.session.views });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port} Database is connected`);
    });
}).catch((error) => {
    console.log('Error:', error.message);
});

