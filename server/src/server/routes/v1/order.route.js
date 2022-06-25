import express from "express";
import validate from "../../middlewares/validate.js";
import orderValidation from "../../validations/order.validation.js";
import auth from "../../middlewares/auth.js";
import { createOrder, getOrders, getOrder, updateOrder, deleteOrder } from "../../controllers/order.controller.js";


const router = express.Router();

router.route('/')
    .get(auth('getOrders'), validate(orderValidation.getOrders), getOrders)
    .post(auth('manageOrders'), validate(orderValidation.createOrder), createOrder);
router.route("/:orderId")
    .get(auth('manageOrders'), validate(orderValidation.getOrder), getOrder)
    .patch(auth('manageOrders'), validate(orderValidation.updateOrder), updateOrder)
    .delete(auth('manageOrders'), validate(orderValidation.deleteOrder), deleteOrder);


export default router;