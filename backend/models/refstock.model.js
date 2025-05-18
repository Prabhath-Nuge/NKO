import mongoose from "mongoose";

const RefStockSchema = mongoose.Schema({
    repId:{type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
    variantId:{type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true},
    quantity:{type: Number, default: 0}
},{
    timestamps:true
});

const RefStock = mongoose.model('RefStock', RefStockSchema);

export default RefStock;