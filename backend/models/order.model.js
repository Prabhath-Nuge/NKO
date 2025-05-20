import mongoose from "mongoose";

const orderItem = new mongoose.Schema({
    variantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    discount: { type: Number, default: 0 },
    quantity: Number,
});

const order = new mongoose.Schema({
    repId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    type: { type: String, enum: ['ongoing', 'done'], default: 'ongoing', required: true },
    total: { type: Number },
    due: { type: Number },
    payed: { type: Number },
    remaining: { type: Number },
    date: { type: Date, default: Date.now() },
    orderItem: [orderItem],
});

const refStcokHistory = mongoose.model('RefStockHistory', refStcokHistorySchema);

export default refStcokHistory;