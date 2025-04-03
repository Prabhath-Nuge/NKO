import ProductCat from "../models/productcategory.model.js";

export const addProductCategory = async (req, res) => {
    const user = req.session.user;

    const { name, description } = req.body;

    if (!name) {
        return res.status(400).json({
            error: true,
            message: "Product Category name is required"
        });
    }

    if (user.type == 'admin') {
        const existCategory = await ProductCat.findOne({ name: name });

        if (existCategory) {
            return res.status(400).json({
                error: true,
                message: "Product Category already exists"
            });
        }

        const newCategory = new ProductCat({
            name: name,
            description: description
        });
        await newCategory.save();

        return res.status(200).json({
            error: false,
            message: "Product Category added successfully"
        });
    }

    return res.status(403).json({
        error: true,
        message: "Unauthorized"
    });
}

export const getProductCategories = async (req, res) => {
    try {
        const user = req.session.user;

        if (user.type == 'admin') {
            const categories = await ProductCat.find({});

            return res.status(200).json({
                error: false,
                data: categories
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });

    }

    return res.status(403).json({
        error: true,
        message: "Unauthorized"
    });
}