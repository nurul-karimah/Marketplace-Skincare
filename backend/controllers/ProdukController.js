import path from "path";
import Product from "../models/ProdukModels.js";
import Category from "../models/KategoriModels.js";

// CREATE Product
export const createProduct = async (req, res) => {
  try {
    if (!req.files || !req.files.photo) {
      return res.status(400).json({ msg: "No File Uploaded" });
    }

    const file = req.files.photo;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    const fileName = file.md5 + ext;
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase())) {
      return res.status(422).json({ msg: "Invalid Image Format" });
    }
    if (fileSize > 5000000) {
      return res.status(422).json({ msg: "File terlalu besar, gunakan file < 5 MB" });
    }

    // Simpan file (dibungkus promise biar bisa pakai await)
    await new Promise((resolve, reject) => {
      file.mv(`./public/products/${fileName}`, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    const { name, price, description, review, categoryId } = req.body;

    const product = await Product.create({
      name,
      price,
      description,
      review,
      categoryId,
      photo: fileName,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


// GET All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ["id", "name"] }],
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// GET Product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
      include: [{ model: Category, attributes: ["id", "name"] }],
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// UPDATE Product
export const updateProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  let fileName = product.photo;

  if (req.files && req.files.photo) {
    const file = req.files.photo;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedTypes = [".png", ".jpg", ".jpeg"];

    if (!allowedTypes.includes(ext.toLowerCase()))
      return res.status(422).json({ msg: "Invalid Image Format" });
    if (fileSize > 5000000)
      return res
        .status(422)
        .json({ msg: "File terlalu besar, gunakan file < 5 MB" });

    file.mv(`./public/products/${fileName}`, (err) => {
      if (err) return res.status(500).json({ msg: err.message });
    });
  }

  try {
    const { name, price, description, review, categoryId } = req.body;
    await product.update({
      name,
      price,
      description,
      review,
      categoryId,
      photo: fileName,
    });
    res.json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// DELETE Product
export const deleteProduct = async (req, res) => {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ msg: "Product not found" });

  try {
    await product.destroy();
    res.json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
