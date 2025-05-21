import Order from "../models/order.model.js";
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

        const order = await Order.findOne({ repId: user._id, type: "ongoing" });
        if (order) {
            const orderItem = order.orderItem.find(item => item.variantId.toString() === productId);
            if (orderItem) {
                orderItem.quantity = quantity;
                orderItem.total = total;
                orderItem.discount = discount;

            } else {
                order.orderItem.push({ variantId: productId, quantity, total, discount });
            }
            await order.save();
            return res.status(200).json({ error: false, message: "Order updated successfully" });
        }
        else {
            const ifBatch = await Order.findOne({ repId: user._id, type: "done" });
            if (ifBatch) {
                const newOrder= new Order({
                    repId: user._id,
                    type: "ongoing",
                    batch: ifBatch.batch,
                    orderItem: [{ variantId: productId, quantity, total, discount }],
                    date: new Date(),
                });
                
                
                await newOrder.save();

            } else {
                const now = new Date();
                const newOrder = new Order({
                    repId: user._id,
                    type: "ongoing",
                    batch: `batch-${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}-${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`,
                    orderItem: [{ variantId: productId, quantity, total, discount }],
                    date: new Date(),
                });
                await newOrder.save();
            }
            return res.status(200).json({ error: false, message: "Order created successfully" });
        }

    } catch (error) {
        res.status(500).json({ error: true, message: error.message });
    }

}

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
        res.status(500).json({ error: true, message: error.message });
    }
}