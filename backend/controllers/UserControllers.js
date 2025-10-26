import User from "../models/UserModel.js";
import path from "path";
import argon2  from "argon2";
import Courier from "../models/CouriesModels.js";
import Shipping from "../models/ShippingModels.js";


export const CreateUser = async(req, res)=>{
 try {
   if (!req.files || !req.files.foto) {
        return res.status(400).json({ msg: "No File Uploaded" });
      }
  
      const file = req.files.foto;
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
        file.mv(`./public/users/${fileName}`, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    const { nama, username, kota, kecamatan, kelurahan, rt_rw, alamatLengkap, password, nohandphone } = req.body;

 

    // hash password
    const hashPassword = await argon2.hash(password);

    const user = await User.create({
      nama,
      foto:fileName,
      username,
      kota,
      kecamatan,
      kelurahan,
      rt_rw,
      alamatLengkap,
      password: hashPassword,
      nohandphone,
    });

    res.status(201).json({ msg: "User berhasil dibuat", user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }

}

export const loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { username: req.body.username },
    });

    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    // simpan session
    req.session.userId = user.id;
    res.status(200).json({
      msg: "Login berhasil",
      user: { id: user.id, nama: user.nama, username: user.username, alamatLengkap: user.alamatLengkap, rt_rw: user.rt_rw, kelurahan: user.kelurahan, kecamatan: user.kelurahan, kota: user.kota },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ msg: "Gagal logout" });
    res.status(200).json({ msg: "Logout berhasil" });
  });
};


export const createCourier = async(req, res)=>{
  try {
    const {name} = req.body;

    const courier = await Courier.create({
      name,
    });
    res.status(201).json({msg: "Couries Berhasil dibuat", courier});
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const deleteCourier = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah data kurir ada
    const courier = await Courier.findByPk(id);
    if (!courier) {
      return res.status(404).json({ msg: "Courier tidak ditemukan" });
    }

    // Hapus data kurir
    await courier.destroy();

    res.status(200).json({ msg: "Courier berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// 📦 Ambil semua data Courier
export const getAllCourier = async (req, res) => {
  try {
    const couriers = await Courier.findAll({
      order: [['createdAt', 'DESC']], // urut dari terbaru
    });
    res.status(200).json(couriers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Gagal mengambil data courier" });
  }
};

export const createShipping = async(req, res)=>{
  try {
    const {region, cost} = req.body;

    const shipping = await Shipping.create({
      region,
      cost
    });
    res.status(201).json({msg: "Shipping Berhasil dibuat", shipping});
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const getCourir = async(req, res)=>{
  try {
    const couriers = await Courier.findAll();

    res.json(couriers)
  } catch (error) {
    res.status(500).json({msg: error.message});
    
  }
}
export const getShipping = async(req, res)=>{
  try {
    const shipping = await Shipping.findAll();

    res.json(shipping)
  } catch (error) {
    res.status(500).json({msg: error.message});
    
  }
}

export const deleteShippings = async (req, res) => {
  try {
    const { id } = req.params;

    // Cek apakah data kurir ada
    const shipping = await Shipping.findByPk(id);
    if (!shipping) {
      return res.status(404).json({ msg: "Courier tidak ditemukan" });
    }

    // Hapus data kurir
    await shipping.destroy();

    res.status(200).json({ msg: "Courier berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
