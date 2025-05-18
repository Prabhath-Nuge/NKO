import Product from "../models/product.model.js";
import ProductCat from "../models/productcategory.model.js";
import RefStock from "../models/refstock.model.js";
import refStcokHistory from "../models/refstockhistory.model.js";

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
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};

export const updateStock = async (req, res) => {
    const { id } = req.params;
    const { refId, newStock } = req.body;


    try {
        if (req.session.user.type !== 'admin' && req.session.user.type !== 'manager') {
            return res.status(403).json({ message: 'Forbidden' });
        }
        if (!id || newStock === undefined || !refId) {
            return res.status(400).json({
                error: true,
                message: 'Variant ID and new stock amount are required',
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                error: true,
                message: 'Product not found',
            });
        }

        const isInStock = await RefStock.findOne({
            variantId: id,
            repId: refId,
        });

        if (isInStock) {
            isInStock.quantity = newStock;
            await isInStock.save();
        }
        else {
            const newStockEntry = new RefStock({
                variantId: id,
                repId: refId,
                quantity: newStock,
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
                existingVariant.quantity = newStock;
            } else {
                // Push a new variant entry
                checkAvailableHistory.variant.push({
                    variantId: id,
                    quantity: newStock,
                });
            }

            await checkAvailableHistory.save();
        }
        else {
            const newHistoryEntry = new refStcokHistory({
                repId: refId,
                type: 'ongoing',
                variant: [
                    {
                        variantId: id,
                        quantity: newStock,
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