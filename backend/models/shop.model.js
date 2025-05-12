import mongoose from "mongoose";

const ShopSchema = mongoose.Schema({
    managerId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    name:{type: String,required: true, unique: true},
    owner:{type: String},
    contact:{type: Number},
    address: {type: String},
    totalDebt: {type: Number},
},{
    timestamps:true
});

const Shop = mongoose.model('Shop', ShopSchema);

export default Shop;