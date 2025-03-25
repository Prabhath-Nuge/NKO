import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    name:{type: String,required: true},
    email:{type: String, required: true,unique: true},
    phone:{type: String},
    address: { type: String},
    dob: { type: Date},
    password:{type: String,required: true},
    type:{type: String,required: true, default: 'user'}
},{
    timestamps:true
});

const User = mongoose.model('Customer', UserSchema);

export default User;