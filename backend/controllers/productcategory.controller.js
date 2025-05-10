import Product from "../models/product.model.js";
import ProductCat from "../models/productcategory.model.js";

export const addProductCategory = async (req, res) => {
    const user = req.session.user;

    const { name, description, image } = req.body;

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
            description: description,
            image: image
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
        const categories = await ProductCat.find({});

        return res.status(200).json({
            error: false,
            data: categories
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });

    }
}

export const getHomeProductCategories = async (req, res) => {
    try {
        const categories = await ProductCat.find().limit(9);

        return res.status(200).json({
            error: false,
            data: categories
        });

    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });

    }
}

export const addNewProduct = async (req, res) => {
    const user = req.session.user;

    const { category, salesPrice, shopPrice, weight } = req.body;

    if (!category || !salesPrice || !weight || !shopPrice) {
        return res.status(400).json({
            error: true,
            message: "All fields are required"
        });
    }

    if (user.type == 'admin') {
        const existCategory = await ProductCat.findById(category);

        if (!existCategory) {
            return res.status(400).json({
                error: true,
                message: "Product Category does not exist"
            });
        }

        const newProduct = new Product({
            category: category,
            salesPrice: salesPrice,
            shopPrice: shopPrice,
            weight: weight
        });
        await newProduct.save();

        return res.status(200).json({
            error: false,
            message: "Product added successfully"
        });
    }
}

export const getProductVariants = async (req, res) => {
    const { id } = req.params;
    try {
        const variants = await Product.find({ category: id });
        if (variants.length === 0) {
            return res.status(404).json({
                error: true,
                message: "No variants found for this category"
            });
        }
        return res.status(200).json({
            error: false,
            data: variants
        });
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
}

export const editvariant = async (req, res) => {
    const { id } = req.params;
    const { packetsPerBundle, weight, salesPrice, shopPrice } = req.body;
    console.log(weight, salesPrice, shopPrice, id);


    try {
        const variant = await Product.findById(id);
        if (!variant) {
            return res.status(404).json({
                error: true,
                message: "Variant not found"
            });
        }

        variant.weight = weight;
        variant.salesPrice = salesPrice;
        variant.shopPrice = shopPrice;
        variant.packetsPerBundle = packetsPerBundle;

        if (req.session.user.type == 'admin') {
            await variant.save();

            return res.status(200).json({
                error: false,
                message: "Variant updated successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: error.message
        });
    }
}

export const editProductCategory = async (req, res) => {

    try {
        const { id, name, description, image } = req.body;
        console.log(id, name, description, image);
        

        if (!name) {
            return res.status(400).json({
                error: true,
                message: "Product Category name is required"
            });
        }

        if (req.session.user.type == 'admin') {
            const existCategory = await ProductCat.findById(id);

            if (!existCategory) {
                return res.status(400).json({
                    error: true,
                    message: "Product Category does not exist"
                });
            }

            existCategory.name = name;
            existCategory.description = description;
            existCategory.image = image;

            await existCategory.save();

            return res.status(200).json({
                error: false,
                message: "Product Category updated successfully"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: true,
            message: "Internal server error"
        });
    }
}

export const getProductsWithStocks = async (req, res) => {
  try {
    const user = req.session.user;

    // Check if user is authenticated and has the correct permissions
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.type !== 'admin' && user.type !== 'manager') {
      return res.status(403).json({ message: "Forbidden" });
    }

    // Find all products and populate the category details
    const products = await Product.find()
      .populate('category')  // Populating all category details (category name, image, etc.)

    // Group products by category
    const groupedProducts = {};

    products.forEach(product => {
      const categoryName = product.category.name;

      // If the category doesn't exist in the groupedProducts object, create it
      if (!groupedProducts[categoryName]) {
        groupedProducts[categoryName] = {
          categoryName: categoryName,
          categoryImage: product.category.image,
          variants: [] // Initialize variants array
        };
      }

      // Add product variants (weight and stock) to the correct category
      groupedProducts[categoryName].variants.push({
        weight: product.weight,
        currentStock: product.currentStock,
      });
    });

    // Convert the groupedProducts object into an array for response
    const result = Object.values(groupedProducts);

    // Return the formatted result
    return res.status(200).json({
      error: false,
      data: result,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products with stock" });
  }
};
