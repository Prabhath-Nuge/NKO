import Product from "../models/product.model.js";
import ProductCat from "../models/productcategory.model.js";
import RefStock from "../models/refstock.model.js";
import refStcokHistory from "../models/refstockhistory.model.js";
import Stock from "../models/stock.model.js";
import User from "../models/user.model.js";

export const getRefCurrentStock = async (req, res) => {
    try {
        const { id } = req.params;
        const categories = await ProductCat.find();

        const result = [];

        for (const category of categories) {
            const products = await Product.find({ category: category._id });

            const productSummaries = await Promise.all(products.map(async (product) => {
                const refStock = await RefStock.findOne({
                    repId: id,
                    variantId: product._id,
                });



                return {
                    productId: product._id,
                    weight: product.weight,
                    salesPrice: product.salesPrice,
                    shopPrice: product.shopPrice,
                    packetsPerBundle: product.packetsPerBundle,
                    repStock: refStock ? refStock.quantity : 0
                };
            }));

            result.push({
                categoryId: category._id,
                name: category.name,
                description: category.description,
                image: category.image,
                products: productSummaries
            });
        }

        return res.json({ data: result });


    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
};

export const updateStock = async (req, res) => {
    const { id } = req.params;
    const { refId, delta } = req.body;


    try {
        if (req.session.user.type !== 'admin' && req.session.user.type !== 'manager') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (!id || delta === undefined || !refId) {
            return res.status(400).json({
                error: true,
                message: 'Variant ID and new stock amount are required',
            });
        }

        const product = await Product.findById(id).populate('category');
        if (!product) {
            return res.status(404).json({
                error: true,
                message: 'Product not found',
            });
        }

        const user = await User.findById(req.session.user._id);

        const user2 = await User.findById(refId);


        await Stock.create({
            variantId: id,
            changeAmount: delta,
            changedBy: user.name,
            changeDate: new Date(),
            changeReason: `Updated stock for: ${user2.name} variant: ${product.category.name} - ${product.weight}g by ${delta}`,
        });


        await Product.findOneAndUpdate(
            { _id: id },
            { $inc: { currentStock: -(delta) } },
            { new: true }
        );

        const isInStock = await RefStock.findOne({
            variantId: id,
            repId: refId,
        });

        if (isInStock) {
            isInStock.quantity = isInStock.quantity + delta;
            await isInStock.save();
        }
        else {
            const newStockEntry = new RefStock({
                variantId: id,
                repId: refId,
                quantity: delta,
            });
            await newStockEntry.save();
        }

        const checkAvailableHistory = await refStcokHistory.findOne({
            repId: refId,
            type: 'ongoing',
        });

        if (checkAvailableHistory) {
            const existingVariant = checkAvailableHistory.variant.find(
                (v) => v.variantId.toString() === id
            );

            if (existingVariant) {
                // Update quantity if the variant already exists
                existingVariant.quantity = existingVariant.quantity + delta;
            } else {
                // Push a new variant entry
                checkAvailableHistory.variant.push({
                    variantId: id,
                    quantity: delta,
                });
            }

            await checkAvailableHistory.save();
        }
        else {
            const now = new Date();
            const newHistoryEntry = new refStcokHistory({
                repId: refId,
                type: 'ongoing',
                batchId: `batch-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`,
                variant: [
                    {
                        variantId: id,
                        quantity: delta,
                    },
                ],
            });
            await newHistoryEntry.save();
        }


        res.status(200).json({
            error: false,
            message: 'Stock updated successfully',
            data: product,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

export const getRefPastStocks = async (req, res) => {
    try {
        const { id } = req.params;

        const refStockHistory = await refStcokHistory
            .find({ repId: id, type: 'done' })
            .populate({
                path: 'variant.variantId',
                populate: {
                    path: 'category',
                    model: 'ProductCategory',
                }
            });
        const refStockHistoryWithDetails = refStockHistory.map((history) => {
            const variantDetails = history.variant.map((variant) => {
                return {
                    ...variant,
                    variantId: variant.variantId._id,
                    category: variant.variantId.category.name,
                    weight: variant.variantId.weight,
                };
            });

            return {
                ...history._doc,
                variant: variantDetails,
            };
        });
        res.status(200).json({
            error: false,
            message: 'Ref stock history fetched successfully',
            data: refStockHistoryWithDetails,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

export const getRefPastStockBatchs = async (req, res) => {
    try {
        const { id } = req.params;
        

        if (!id) {
            return res.status(400).json({
                error: true,
                message: 'ID is required',
            });
        }

        if (req.session.user.type !== 'admin' && req.session.user.type !== 'manager') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        const refStockHistory = await refStcokHistory.find({ repId: id, type: { $in: ['ongoing','saved'] } });

        res.status(200).json({
            error: false,
            data: refStockHistory,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: true,
            message: 'Internal server error',
        });
    }
}

export const getRefStockHistoryByBatch = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    

    const refStock = await refStcokHistory.findOne({batchId: id})
      .populate('repId', 'name email') // optional if you want rep info
      .populate({
        path: 'variant.variantId',
        populate: {
          path: 'category',
          model: 'ProductCategory', // or your actual model name
          select: 'name',
        },
      });

    if (!refStock) return res.status(404).json({ error: 'No data found' });

    res.json({ data: refStock });
  } catch (error) {
    console.error('Error fetching ref stock:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

export const reStock = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  

  try {
    const user = req.session.user;

    if (!user || (user.type !== 'admin' && user.type !== 'manager')) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    if (!id) {
      return res.status(400).json({
        error: true,
        message: 'Batch ID is required',
      });
    }

    const refStockChange = await refStcokHistory.findOne({ batchId: id, type: 'ongoing' });

    if (!refStockChange) {
      return res.status(404).json({ error: true, message: 'RefStockHistory not found or already saved' });
    }

    refStockChange.type = 'saved';
    await refStockChange.save();

    for (const item of refStockChange.variant) {
      const { variantId, quantity } = item;

      // 1. Subtract from RefStock (per rep + variant)
      const refStock = await RefStock.findOne({
        repId: refStockChange.repId,
        variantId,
      });

      if (refStock) {
        refStock.quantity = Math.max(0, refStock.quantity - quantity); // prevent negative
        await refStock.save();
      }

      // 2. Add to Product's current stock
      const product = await Product.findById(variantId);

      if (product) {
        product.currentStock = (product.currentStock || 0) + quantity;
        await product.save();
      }
    }

    const result = await RefStock.updateMany({}, { $set: { quantity: 0 } });

    return res.json({
      success: true,
      message: 'Stock successfully updated and batch marked as saved',
    });

  } catch (error) {
    console.error('Error during reStock:', error);
    return res.status(500).json({
      error: true,
      message: 'Server error',
    });
  }
};
