import mongoose from "mongoose";

const refStcokHistoryVariantSchema = new mongoose.Schema({
  variantId: {type: mongoose.Schema.Types.ObjectId, ref: 'Product',required: true},
  quantity: Number,
  date: {type: Date, default: Date.now()},
});

const refStcokHistorySchema = new mongoose.Schema({
  repId: {type: mongoose.Schema.Types.ObjectId, ref: 'User',required: true},
  type: {type: String, enum: ['ongoing', 'done'], default: 'ongoing', required: true},
  date: {type: Date, default: Date.now()},
  batchId: String,
  variant: [refStcokHistoryVariantSchema]
});

const refStcokHistory = mongoose.model('RefStockHistory', refStcokHistorySchema);

export default refStcokHistory;
