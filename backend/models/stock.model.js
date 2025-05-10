import mongoose from "mongoose";

const StockSchema = mongoose.Schema({
    variantId:{type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true},
    changeAmount:{type: Number, required: true},
    changedBy:{type: String, required: true},
    changeDate:{type: Date, required: true},
    changeReason:{type: String, required: true},
},{
    timestamps:true
});

const Stock = mongoose.model('Stock', StockSchema);

export default Stock;