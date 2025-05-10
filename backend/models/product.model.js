import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    category:{type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory',required: true},
    salesPrice:{type: Number},
    shopPrice:{type: Number},
    weight:{type: Number},
    currentStock:{type: Number, default: 0},
    packetsPerBundle:{type: Number, default: 0},
},{
    timestamps:true
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;