import mongoose from "mongoose";

const ProductCategorySchema = mongoose.Schema({
    name:{type: String,required: true, unique: true},
    description:{type: String},
    image: {type: String},
},{
    timestamps:true
});

const ProductCat = mongoose.model('ProductCategory', ProductCategorySchema);

export default ProductCat;