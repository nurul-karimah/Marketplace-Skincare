import User from "./UserModel.js";
import Admin from "./AdminModel.js";
import Product from "./ProductModel.js";
import Order from "./OrderModel.js";
import Shipping from "./ShippingModel.js";
import Courier from "./CouriersModel.js";

// User -> Order
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// Product -> Order
Product.hasMany(Order, { foreignKey: "productId" });
Order.belongsTo(Product, { foreignKey: "productId" });

// Shipping -> Order
Shipping.hasMany(Order, { foreignKey: "shippingId" });
Order.belongsTo(Shipping, { foreignKey: "shippingId" });

// Courier -> Order
Courier.hasMany(Order, { foreignKey: "courierId" });
Order.belongsTo(Courier, { foreignKey: "courierId" });

export { User, Admin, Product, Order, Shipping, Courier };
