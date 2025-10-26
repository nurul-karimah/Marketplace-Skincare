import express from "express"
import { CreateUser, loginUser, createCourier, createShipping, getCourir, getShipping, logoutUser, deleteCourier, deleteShippings } from "../controllers/UserControllers.js";
const router = express.Router();

router.post('/user', CreateUser);
router.post('/LoginUser', loginUser);
router.post('/shipping', createShipping);
router.get('/Courier', getCourir);
router.post('/Courier', createCourier);
router.get('/shipping', getShipping)
router.delete("/Userlogout", logoutUser);
router.delete("/deleteCourier/:id", deleteCourier)
router.delete("/deleteShipping/:id", deleteShippings)


export default router;