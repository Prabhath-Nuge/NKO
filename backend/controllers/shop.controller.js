import Shop from "../models/shop.model.js";

export const addShop = async (req, res) => {
  try {
    const { name, owner ,contact , address } = req.body;

    if (!name) {
      return res.status(400).json({ error: true , message: "Name required" });
    }

    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ error: true , message: "Unauthorized" });
    }
    if(user.type !== "ref"){
      return res.status(403).json({ error: true , message: "Forbidden" });
    }

    const newShop = {
      managerId: req.session.user._id,
      name,
      owner,
      contact,
      address,
      totalDebt: 0,
    };

    await Shop.create(newShop);

    return res.status(200).json({ message: "Shop created successfully" });
    res.status(201).json(newShop);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getShops = async (req, res) => {
  try {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ error: true , message: "Unauthorized" });
    }
    if(user.type !== "ref" && user.type !== "manager" && user.type !== "admin"){ 
      return res.status(403).json({ error: true , message: "Forbidden" });
    }

    const shops = await Shop.find({ managerId: user._id });

    if (!shops) {
      return res.status(404).json({ error: true , message: "Shops not found" });
    }

    return res.status(200).json({ error: false , data: shops });
  } catch (error) {
    res.status(500).json({ error: true , message: error.message });
  }
}

export const getShop = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: true , message: "ID required" });
    }

    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ error: true , message: "Unauthorized" });
    }
    if(user.type !== "manager" && user.type !== "admin" && user.type !== "ref"){
      return res.status(403).json({ error: true , message: "Forbidden" });
    }

    const shop = await Shop.findById(id);

    if (!shop) {
      return res.status(404).json({ error: true , message: "Shop not found" });
    }

    return res.status(200).json({ error: false , data: shop });
  } catch (error) {
    res.status(500).json({ error: true , message: error.message });
  }
}

export const updateShop = async (req, res) => {
  try {
    console.log("hi");
    
    const { id } = req.params;
    const { name, owner ,contact , address } = req.body;

    if (!id) {
      return res.status(400).json({ error: true , message: "ID required" });
    }

    if (!name) {
      return res.status(400).json({ error: true , message: "Name required" });
    }

    const user = req.session.user;

    if (!user) {
      return res.status(401).json({ error: true , message: "Unauthorized" });
    }
    if(user.type !== "manager" && user.type !== "admin" && user.type !== "ref"){
      return res.status(403).json({ error: true , message: "Forbidden" });
    }

    const shop = await Shop.findById(id);

    if (!shop) {
      return res.status(404).json({ error: true , message: "Shop not found" });
    }

    shop.name = name || shop.name;
    shop.owner = owner || shop.owner;
    shop.contact = contact || shop.contact;
    shop.address = address || shop.address;

    await shop.save();

    return res.status(200).json({ error: false , message: "Shop updated successfully" });
  } catch (error) {
    res.status(500).json({ error: true , message: error.message });
  }
}

export const getSHopsByRef = async (req, res) => {
  
}