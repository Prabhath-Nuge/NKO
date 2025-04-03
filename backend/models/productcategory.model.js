import mongoose from "mongoose";

const ProductCategory = mongoose.Schema({
    name:{type: String,required: true, unique: true},
    description:{type: String}
},{
    timestamps:true
});

const ProductCat = mongoose.model('ProdcutCategory', ProductCategory);

export default ProductCat;