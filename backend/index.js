import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
// import cron from 'node-cron';

import userRouter from './routers/user.router.js';
import productCatRouter from './routers/product.router.js';
import apiRouter from './routers/api.router.js';
import stockRouter from './routers/stock.router.js'
import shopRouter from './routers/shop.router.js';
import refstockRouter from './routers/refstock.router.js'
import orderRouter from './routers/order.router.js';
import salaryRouter from './routers/salary.router.js';
import { startMonthlySalaryAddition } from './functions/cron-scheule.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "https://nko-frontend.vercel.app",
    credentials: true,
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

startMonthlySalaryAddition();
// cron.schedule('*/5 * * * * *', () => {
//     console.log('hi');
// });
app.use('/',userRouter);
app.use('/product', productCatRouter);
app.use('/api', apiRouter);
app.use('/stock', stockRouter);
app.use('/shop', shopRouter);
app.use('/stock', refstockRouter);
app.use('/order', orderRouter);
app.use('/salary', salaryRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port} Database is connected`);
    });
}).catch((error) => {
    console.log('Error:', error.message);
});

