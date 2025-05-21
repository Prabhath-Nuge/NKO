import Order from "../models/order.model.js";
import RefStock from "../models/refstock.model.js";
import Shop from "../models/shop.model.js";

export const addToOrder = async (req, res) => {
  const { productId, quantity, discount, total } = req.body;

  try {
    if (!productId || !quantity || !total) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const user = req.session.user;
    if (user.type !== "ref") {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }

    // ✅ Check RefStock
    const stock = await RefStock.findOne({
      repId: user._id,
      variantId: productId,
    });

    if (!stock || stock.quantity < quantity) {
      return res.status(400).json({
        error: true,
        message: `Insufficient stock for product. Available: ${stock ? stock.quantity : 0}, Requested: ${quantity}`,
      });
    }

    // ✅ Find or create ongoing order
    let order = await Order.findOne({ repId: user._id, type: "ongoing" });

    if (order) {
      const existingItem = order.orderItem.find(item => item.variantId.toString() === productId);

      if (existingItem) {
        // Optional: Check if the new quantity exceeds stock (not just this update)
        const newQty = quantity;
        if (stock.quantity < newQty) {
          return res.status(400).json({
            error: true,
            message: `Not enough stock to update product. Available: ${stock.quantity}, Requested: ${newQty}`,
          });
        }

        existingItem.quantity = newQty;
        existingItem.total = total;
        existingItem.discount = discount;
      } else {
        order.orderItem.push({ variantId: productId, quantity, total, discount });
      }

      await order.save();
      return res.status(200).json({ error: false, message: "Order updated successfully" });

    } else {
      // Create new order
      const lastBatch = await Order.findOne({ repId: user._id, type: "done" });
      const now = new Date();
      const batchId = lastBatch
        ? lastBatch.batch
        : `batch-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

      const newOrder = new Order({
        repId: user._id,
        type: "ongoing",
        batch: batchId,
        orderItem: [{ variantId: productId, quantity, total, discount }],
        date: now,
      });

      await newOrder.save();
      return res.status(200).json({ error: false, message: "Order created successfully" });
    }
  } catch (error) {
    console.error("addToOrder error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};

export const getOngoindOrder = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: true, message: "ID required" });
        }

        const user = req.session.user;

        if (user.type !== "ref") {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }
        const order = await Order.findOne({ repId: id, type: "ongoing" }).populate({
            path: "orderItem.variantId",
            populate: {
                path: "category",
                model: "ProductCategory" // change if your model is named differently
            }
        }).populate({
            path: "shopId",
            options: { strictPopulate: false } // avoids some crashes on missing ref
        });

        if (!order) {
            return res.status(404).json({ error: true, message: "Order not found" });
        }
        return res.status(200).json({ error: false, data: order });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
};

export const addShopToOrder = async (req, res) => {
    const { shopId, orderId } = req.body;
    try {
        if (!shopId || !orderId) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const user = req.session.user;

        if (user.type !== "ref") {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: true, message: "Order not found" });
        }

        const shop = await Shop.findById(shopId);

        order.shopId = shopId;
        order.due = shop.totalDebt;
        await order.save();

        return res.status(200).json({ error: false, message: "Shop added to order successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}

export const removeShopFromOrder = async (req, res) => {
    const { orderId } = req.body;
    try {
        if (!orderId) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const user = req.session.user;

        if (user.type !== "ref") {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: true, message: "Order not found" });
        }

        order.shopId = null;
        order.total = 0;
        order.due = 0;
        order.payed = 0;
        order.remaining = 0;
        await order.save();

        return res.status(200).json({ error: false, message: "Shop removed from order successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}

export const deleteOrder = async (req, res) => {
    console.log(req.params);

    const { id } = req.params;
    try {
        if (!id) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const user = req.session.user;

        if (user.type !== "ref") {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }

        const order = await Order.findById(id);
        if (!order) {
            return res.status(404).json({ error: true, message: "Order not found" });
        }
        await Order.findByIdAndDelete(id);

        return res.status(200).json({ error: false, message: "Order deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}

export const enterPayment = async (req, res) => {
    const { orderId, amount, grandTotal } = req.body;
    try {
        if (!orderId || !amount || !grandTotal) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const user = req.session.user;

        if (user.type !== "ref") {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }

        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: true, message: "Order not found" });
        }

        order.payed = amount;
        order.remaining = grandTotal - order.payed;
        await order.save();

        return res.status(200).json({ error: false, message: "Payment added successfully" });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}

export const orderFinish = async (req, res) => {
  const { orderId, todayTotal, shopId, remaining } = req.body;

  try {
    if (!orderId || !todayTotal) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const user = req.session.user;
    if (user.type !== "ref") {
      return res.status(401).json({ error: true, message: "Unauthorized" });
    }

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: true, message: "Order not found" });
    }

    for (const item of order.orderItem) {
      const refStock = await RefStock.findOne({
        repId: order.repId,
        variantId: item.variantId,
      });

      if (!refStock) {
        return res.status(400).json({
          error: true,
          message: `No stock found for variant ${item.variantId}`,
        });
      }

      if (refStock.quantity < item.quantity) {
        return res.status(400).json({
          error: true,
          message: `Insufficient stock for variant ${item.variantId}. Available: ${refStock.quantity}, Needed: ${item.quantity}`,
        });
      }
    }

    for (const item of order.orderItem) {
      const refStock = await RefStock.findOne({
        repId: order.repId,
        variantId: item.variantId,
      });

      refStock.quantity -= item.quantity;
      await refStock.save();
    }

    order.type = "done";
    order.total = todayTotal;

    if (shopId) {
      order.shopId = shopId;
      order.remaining = remaining;
      await Shop.findByIdAndUpdate(shopId, { $set: { totalDebt: remaining } });
    }

    await order.save();

    return res.status(200).json({ error: false, message: "Order finished successfully" });
  } catch (error) {
    console.error("Order finish error:", error);
    res.status(500).json({ error: true, message: error.message });
  }
};


export const refGetDoneOrders = async (req, res) => {
    const { id } = req.params;
    console.log(id);

    try {
        if (!id) {
            return res.status(400).json({ error: true, message: "ID required" });
        }

        const user = req.session.user;

        if (user.type !== "ref") {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }
        const order = await Order.find({ repId: id, type: "done" }).populate('shopId');

        console.log(order);

        if (!order) {
            return res.status(404).json({ error: true, message: "Order not found" });
        }

        return res.status(200).json({ error: false, data: order });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}

export const deleteProductFromOrder = async (req, res) => {
    const { orderId, variantId } = req.body;

    try {
        if (!orderId || !variantId) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const user = req.session.user;
        if (user?.type !== "ref") {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }

        const order = await Order.findById(orderId);

        if (!order) {
            return res.status(404).json({ error: true, message: "Order not found" });
        }

        const initialLength = order.orderItem.length;

        order.orderItem = order.orderItem.filter(
            item => item.variantId.toString() !== variantId.toString()
        );

        if (order.orderItem.length === initialLength) {
            return res.status(404).json({ error: true, message: "Product not found in order" });
        }

        await order.save();
        return res.status(200).json({ error: false, message: "Product removed from order successfully" });
    } catch (error) {
        console.error('Delete error:', error);
        return res.status(500).json({ error: true, message: error.message });
    }
};

export const saveBatch = async (req, res) => {
    const { repId } = req.body;
    try {
        if (!repId) {
            return res.status(400).json({ error: true, message: "All fields are required" });
        }

        const user = req.session.user;

        if (user.type !== "ref") {
            return res.status(401).json({ error: true, message: "Unauthorized" });
        }

        const result = await Order.updateMany(
            { type: 'done', repId: repId },
            { $set: { type: 'saved' } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).json({ error: true, message: "No orders found to update" });
        }



        return res.status(200).json({ error: false, message: `Modified and saved ${result.modifiedCount} Orders` });
    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }
}