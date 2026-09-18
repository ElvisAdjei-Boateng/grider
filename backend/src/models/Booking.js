import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    riderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rider",
      required: true
    },
    pickup: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    deliveryType: {
      type: String,
      required: true,
      trim: true
    },
    packageSize: {
      type: String,
      required: true,
      trim: true
    },
    schedule: {
      type: String,
      default: "Now"
    },
    notes: {
      type: String,
      default: ""
    },
    price: {
      type: Number,
      default: 15
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "in_transit", "completed", "cancelled"],
      default: "pending"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Booking", bookingSchema);
