import Admin from "../models/AdminModels.js";
import argon2 from "argon2";

// ✅ Create Admin
export const createAdmin = async (req, res) => {
  try {
    const { nama, username, password, confPassword } = req.body;

    if (password !== confPassword) {
      return res.status(400).json({ msg: "Password dan Konfirmasi tidak sesuai" });
    }

    // hash password
    const hashPassword = await argon2.hash(password);

    const admin = await Admin.create({
      nama,
      username,
      password: hashPassword,
    });

    res.status(201).json({ msg: "Admin berhasil dibuat", admin });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Login Admin
export const loginAdmin = async (req, res) => {
  try {
    const admin = await Admin.findOne({
      where: { username: req.body.username },
    });

    if (!admin) return res.status(404).json({ msg: "Admin tidak ditemukan" });

    const match = await argon2.verify(admin.password, req.body.password);
    if (!match) return res.status(400).json({ msg: "Password salah" });

    // simpan session
    req.session.adminId = admin.id;
    res.status(200).json({
      msg: "Login berhasil",
      admin: { id: admin.id, nama: admin.nama, username: admin.username },
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

// ✅ Logout Admin
export const logoutAdmin = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ msg: "Gagal logout" });
    res.status(200).json({ msg: "Logout berhasil" });
  });
};
