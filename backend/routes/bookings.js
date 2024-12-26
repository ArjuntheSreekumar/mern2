import express from "express";
import { createBooking ,getAllBooking,getBooking} from "../controllers/bookingController.js";
const router=express.Router();
router.post("/",createBooking);
router.get("/:id",getBooking);
router.post("/",getAllBooking);
export default router;