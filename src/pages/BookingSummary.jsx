import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiFetch, getStoredUser } from "../lib/api";

const BookingSummary = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-3xl font-bold">No booking information found.</h1>
      </div>
    );
  }

  const { booking, rider } = state;

  const handleConfirm = async () => {
    const user = getStoredUser();
    if (!user) {
      navigate("/login");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const payload = {
        customerId: user.id,
        riderId: rider._id || rider.id,
        pickup: booking.pickup,
        destination: booking.destination,
        deliveryType: booking.deliveryType,
        packageSize: booking.packageSize,
        schedule: booking.schedule,
        notes: booking.notes,
        price: booking.price || 15
      };

      const data = await apiFetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify(payload)
      });

      navigate("/booking-success", {
        state: { booking: data.booking, rider }
      });
    } catch (err) {
      setError(err.message || "Could not confirm booking.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold mb-8">Booking Summary</h1>

        <div className="space-y-5">
          <div className="flex justify-between"><span>Rider</span><strong>{rider?.name}</strong></div>
          <div className="flex justify-between"><span>Pickup</span><strong>{booking.pickup}</strong></div>
          <div className="flex justify-between"><span>Destination</span><strong>{booking.destination}</strong></div>
          <div className="flex justify-between"><span>Delivery</span><strong>{booking.deliveryType}</strong></div>
          <div className="flex justify-between"><span>Package</span><strong>{booking.packageSize}</strong></div>
          <div className="flex justify-between"><span>Schedule</span><strong>{booking.schedule}</strong></div>
          <div className="flex justify-between"><span>Estimated Price</span><strong>GH₵ {booking.price || 15}</strong></div>
        </div>

        {error && <p className="mt-5 text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleConfirm}
          disabled={isSubmitting}
          className="block mt-10 w-full bg-green-600 text-white text-center py-4 rounded-xl hover:bg-green-700 disabled:opacity-60"
        >
          {isSubmitting ? "Confirming booking..." : "Confirm Booking"}
        </button>

        <Link
          to="/"
          className="block mt-4 text-center text-gray-600 hover:text-green-700"
        >
          Cancel
        </Link>
      </div>
    </section>
  );
};

export default BookingSummary;