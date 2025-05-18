import Product from "../models/product.model.js";
import Stock from "../models/stock.model.js";

export const changeStock = async (req, res) => {
  const { variantId, changeAmount, changedBy, changeDate, changeReason } = req.body;
  

  try {
    
    if(req.session.user.type !== 'admin' && req.session.user.type !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (!variantId || !changeAmount || !changedBy || !changeDate || !changeReason) {
      return res.status(400).json({
        error: true,
        message: 'All fields are required',
      });
    }

    if(changeAmount === 0 || changeReason === '') {
      return res.status(400).json({
        error: true,
        message: 'Please provide a valid change amount and reason.',
      });
    }

    const existingStock = await Product.findById(variantId);
    if (!existingStock) {
      return res.status(404).json({
        error: true,
        message: 'Variant not found',
      });
    }

    const newStockAmount = existingStock.currentStock + changeAmount;

    if (newStockAmount < 0) {
      return res.status(400).json({
        error: true,
        message: 'Stock cannot be negative',
      });
    }

    existingStock.currentStock = newStockAmount;
    await existingStock.save();

    const newStock = new Stock({
      variantId,
      changeAmount,
      changedBy,
      changeDate: new Date(changeDate),
      changeReason,
    });

    await newStock.save();

    res.status(201).json({ message: 'Stock changed successfully', stock: newStock });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

export const getStockHistory = async (req,res)=>{
  try {
    if(req.session.user.type !== 'admin' && req.session.user.type !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    const stockHistory = await Stock.find().limit(15).populate({
      path: 'variantId',
      populate: {
        path: 'category',
        select: 'name',
      }
    }).sort({ changeDate: -1 });
    res.status(200).json({
      error: false,
      data: stockHistory,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
}

export const updateStock = async (req, res) => {
  const { variantId } = req.params;
  const { refId, newStock } = req.body;

  try {
    if(req.session.user.type !== 'admin' && req.session.user.type !== 'manager') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    if (!variantId || newStock === undefined || !refId) {
      return res.status(400).json({
        error: true,
        message: 'Variant ID and new stock amount are required',
      });
    }

    const product = await Product.findById(variantId);
    if (!product) {
      return res.status(404).json({
        error: true,
        message: 'Product not found',
      });
    }

    product.currentStock = newStock;
    await product.save();

    res.status(200).json({
      error: false,
      message: 'Stock updated successfully',
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: 'Internal server error',
    });
  }
}