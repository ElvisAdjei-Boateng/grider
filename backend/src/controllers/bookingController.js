import Booking from "../models/Booking.js";

export const createBooking = async (req, res) => {
  try {
    const {
      customerId,
      riderId,
      pickup,
      destination,
      deliveryType,
      packageSize,
      schedule,
      notes,
      price
    } = req.body;

    if (!customerId || !riderId || !pickup || !destination || !deliveryType || !packageSize) {
      return res.status(400).json({
        message: "Missing required booking fields"
      });
    }

    const booking = await Booking.create({
      customerId,
      riderId,
      pickup,
      destination,
      deliveryType,
      packageSize,
      schedule: schedule || "Now",
      notes: notes || "",
      price: price || 15,
      status: "pending"
    });

    req.app.get("io").emit("booking-created", {
      bookingId: booking._id,
      status: booking.status
    });

    res.status(201).json({
      message: "Booking created successfully",
      booking
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getBookings = async (req, res) => {
  try {
    const { customerId, riderId } = req.query;
    const filter = {};

    if (customerId) filter.customerId = customerId;
    if (riderId) filter.riderId = riderId;

    const bookings = await Booking.find(filter)
      .populate("customerId", "name email role")
      .populate("riderId", "name location ride deliveryType available rating")
      .sort({ createdAt: -1 });

    res.status(200).json({ count: bookings.length, bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("customerId", "name email role")
      .populate("riderId", "name location ride deliveryType available rating");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = ["pending", "accepted", "in_transit", "completed", "cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid booking status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("riderId", "name location ride deliveryType available rating");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    req.app.get("io").to(`booking:${booking._id}`).emit("booking-status-updated", {
      bookingId: booking._id,
      status: booking.status
    });

    res.status(200).json({ message: "Booking updated", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
