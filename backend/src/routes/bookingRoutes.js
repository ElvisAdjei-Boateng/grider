import express from "express";
import {
  createBooking,
  getBookings,
  getBooking,
  updateBookingStatus
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.get("/", authMiddleware, getBookings);
router.get("/:id", authMiddleware, getBooking);
router.patch("/:id/status", authMiddleware, updateBookingStatus);

export default router;
