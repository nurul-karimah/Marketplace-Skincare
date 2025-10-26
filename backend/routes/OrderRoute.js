import express from "express";
import { createOrder, getOrdersByUserId, getOrderHistoryByUser, deleteOrderHistory, getAllBuyers, getBuyerByOrderId, getOrder, updateOrderStatus, updateOrderCOD } from "../controllers/OrderController.js";

const router = express.Router();
router.post('/createOrder', createOrder);
router.get('/getOrderUser/:id', getOrdersByUserId);
router.get('/HistoriOrder/:userId', getOrderHistoryByUser);
router.delete('/deleteHistori/:id', deleteOrderHistory)
router.put('/updatePesananCod/:id', updateOrderCOD);


// bagian admin
router.get('/getPembeli', getAllBuyers);
router.get('/getPembeli/:id', getBuyerByOrderId);
router.get('/getOrder', getOrder);
router.put('/UpdateStatusOrder/:id', updateOrderStatus);


export default router;
