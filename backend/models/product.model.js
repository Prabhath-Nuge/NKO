import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
    category:{type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory',required: true},
    price:{type: Number},
    weight:{type: Number},
},{
    timestamps:true
});

const Product = mongoose.model('Product', ProductSchema);

export default Product;