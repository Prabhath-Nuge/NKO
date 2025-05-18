import Product from "../models/product.model.js";
import ProductCat from "../models/productcategory.model.js";
import RefStock from "../models/refstock.model.js";

export const getRefCurrentStock = async (req, res) => {
    try {
        const { repId } = req.params;

        // 1. Get all categories
        const categories = await ProductCat.find();

        const result = [];

        for (const category of categories) {
            // 2. Get all products in this category
            const products = await Product.find({ category: category._id });

            const productSummaries = await Promise.all(products.map(async (product) => {
                // 3. Check ref stock for this product/rep
                const refStock = await RefStock.findOne({
                    repId,
                    variantId: product._id,
                });

                return {
                    productId: product._id,
                    weight: product.weight,
                    salesPrice: product.salesPrice,
                    shopPrice: product.shopPrice,
                    packetsPerBundle: product.packetsPerBundle,
                    repStock: refStock ? refStock.quantity : 0 // this is what the rep has
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

        res.json({ data: result });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server Error' });
    }
};