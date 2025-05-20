import mongoose from "mongoose";

const orderItem = new mongoose.Schema({
    variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    discount: { type: Number, default: 0 },
    quantity: {type: Number, required: true},
    total: { type: Number, required: true },
});

const order = new mongoose.Schema({
    repId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    type: { type: String, enum: ['ongoing', 'done', 'saved'], default: 'ongoing', required: true },
    batch: { type: String , required: true },
    total: { type: Number },
    due: { type: Number },
    payed: { type: Number },
    remaining: { type: Number },
    date: { type: Date, default: Date.now() },
    orderItem: [orderItem],
});

const Order = mongoose.model('Order', order);

export default Order;