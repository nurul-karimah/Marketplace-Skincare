// controllers/OrderController.js
import Order from "../models/OrderModel.js";
import User from "../models/UserModel.js";
import Product from "../models/ProdukModels.js";
import Shipping from "../models/ShippingModels.js";
import Courier from "../models/CouriesModels.js";

export const createOrder = async (req, res) => {
  try {
    const { userId, productId, shippingId, courierId, quantity, paymentMethod } = req.body;

    // ✅ Ambil data user
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    // ✅ Ambil data produk
    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ msg: "Produk tidak ditemukan" });

    // ✅ Cek stok tersedia atau tidak
    if (product.stok <= 0) {
      return res.status(400).json({ msg: "Stok produk habis, tidak dapat dipesan." });
    }

    // ✅ Cek apakah jumlah pesanan melebihi stok
    if (quantity > product.stok) {
      return res.status(400).json({ msg: `Stok produk tidak mencukupi. Stok tersisa ${product.stok}` });
    }

    // ✅ Ambil data ongkir
    const shipping = await Shipping.findByPk(shippingId);
    if (!shipping) return res.status(404).json({ msg: "Data ongkir tidak ditemukan" });

    // ✅ Hitung total harga
    const productPrice = parseFloat(product.price);
    const shippingPrice = parseFloat(shipping.cost);
    const totalPrice = productPrice * quantity + shippingPrice;

    // ✅ Gabungkan alamat user
    const fullAddress = `
      ${user.alamatLengkap}, RT ${user.rt}/RW ${user.rw}, 
      Kel. ${user.kelurahan}, Kec. ${user.kecamatan}, 
      ${user.kotaKabupaten}
    `.trim();

    // ✅ Kurangi stok produk
    product.stok -= quantity;
    await product.save();

    // ✅ Simpan order
    const order = await Order.create({
      userId,
      productId,
      shippingId,
      courierId,
      quantity,
      paymentMethod,
      address: fullAddress,
      totalPrice,
      status: "MENUNGGU", // default
    });

    res.status(201).json({
      msg: "Pesanan berhasil dibuat dan stok produk telah diperbarui.",
      order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const { id } = req.params; // ✅ gunakan 'id' karena router pakai :id

    const orders = await Order.findAll({
      where: { userId: id },
      include: [
        {
          model: Product,
          attributes: ['name', 'price', 'photo'],
        },
        {
          model: Courier,
          attributes: ['name'],
        },
        {
          model: Shipping,
          attributes: ['region', 'cost'],
        },
        {
          model: User,
          attributes: ['nama', 'alamatLengkap', 'kota'], // sesuaikan nama kolom di DB-mu
        }
      ],
      order: [['createdAt', 'DESC']],
    });

    if (orders.length === 0) {
      return res.status(404).json({ msg: "Tidak ada pesanan ditemukan untuk user ini." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error("❌ Error getOrdersByUserId:", error);
    res.status(500).json({ msg: error.message });
  }
};

export const getOrderHistoryByUser = async (req, res) => {
  try {
    const { userId } = req.params; // ✅ ambil dari URL params

    const orders = await Order.findAll({
      where: { userId },
      include: [
        { model: Product, attributes: ['name', 'price', 'photo'] },
        { model: Shipping, attributes: ['region', 'cost'] },
        { model: Courier, attributes: ['name'] }
      ],
      order: [['createdAt', 'DESC']]
    });

    if (!orders || orders.length === 0) {
      return res.status(404).json({ msg: "Belum ada riwayat pembelian untuk user ini." });
    }

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil riwayat pembelian" });
  }
};


export const deleteOrderHistory = async (req, res) => {
  try {
    const { id } = req.params;      // ID pesanan yang ingin dihapus
    const { userId } = req.body;    // userId dikirim dari frontend

    // Cari pesanan berdasarkan id dan userId
    const order = await Order.findOne({ where: { id, userId } });
    if (!order) {
      return res.status(404).json({ msg: "Pesanan tidak ditemukan atau bukan milik Anda" });
    }

    // ✅ Cegah penghapusan jika status masih 'DIKIRIM'
    if (order.status === "DIKIRIM") {
      return res.status(400).json({ msg: "Pesanan masih dalam pengiriman dan belum bisa dihapus" });
    }

    // Hapus jika sudah selesai
    await order.destroy();
    res.json({ msg: "Riwayat pembelian berhasil dihapus" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal menghapus riwayat pembelian" });
  }
};






// BAGIAN ADMIN 


export const getAllBuyers = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nama", "username", "alamatLengkap", "rt_rw", "kelurahan", "kecamatan", "kota"],
        },
        {
          model: Product,
          attributes: ["id", "name", "price", "photo"],
        },
        {
          model: Shipping,
          attributes: ["id", "region", "cost"],
        },
        {
          model: Courier,
          attributes: ["id", "name"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};


export const getBuyerByOrderId = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nama", "username","alamatLengkap", "rt_rw", "kelurahan", "kecamatan", "kota", "foto"],
        },
        {
          model: Product,
          attributes: ["id", "name", "price", "photo"],
        },
        {
          model: Shipping,
          attributes: ["id", "region", "cost"],
        },
        {
          model: Courier,
          attributes: ["id", "name"],
        },
      ],
    });

    if (!order) return res.status(404).json({ msg: "Data pembeli tidak ditemukan" });

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



export const getOrder = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ["nama", "username"] },
        { model: Product, attributes: ["name", "price"] },
        { model: Shipping, attributes: ["region", "cost"] },
        { model: Courier, attributes: ["name"] },
      ],
      order: [["createdAt", "DESC"]],
    });

    // Hitung total produk & GMV
    let totalProdukTerjual = 0;
    let totalPendapatan = 0;

    orders.forEach((order) => {
  totalProdukTerjual += Number(order.quantity) || 0;
  totalPendapatan += Number(order.totalPrice) || 0;
});

   res.status(200).json({
  summary: {
    totalProdukTerjual,
    totalPendapatan,
  },
  orders,
});

  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};



export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) return res.status(404).json({ msg: "Pesanan tidak ditemukan" });

    // ✅ Update status
    order.status = status;
    await order.save();

    res.status(200).json({ msg: "Status pesanan berhasil diperbarui", order });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
