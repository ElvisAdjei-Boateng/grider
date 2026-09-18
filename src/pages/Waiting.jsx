import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiFetch } from "../lib/api";

const Waiting = () => {
  const { state } = useLocation();
  const [seconds, setSeconds] = useState(20);
  const [bookingStatus, setBookingStatus] = useState("pending");

  useEffect(() => {
    const booking = state?.booking;
    if (!booking) return;

    const bookingId = booking._id || booking.id;
    if (bookingId) {
      apiFetch(`/api/bookings/${bookingId}`)
        .then((data) => setBookingStatus(data.booking?.status || "pending"))
        .catch((error) => console.error("Could not load booking status:", error));
    }
  }, [state]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => {
        if (prev === 0) {
          clearInterval(timer);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const accepted = bookingStatus === "accepted" || seconds === 0;

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
        <div className="text-6xl">🚴</div>

        <h1 className="text-4xl font-bold mt-5">Waiting for Rider</h1>
        <p className="mt-5 text-gray-600">Looking for the best rider near you...</p>

        <div className="mt-10">
          <div className="w-20 h-20 rounded-full border-8 border-green-500 border-t-transparent animate-spin mx-auto"></div>
        </div>

        <p className="mt-8 text-2xl font-bold">{seconds}s</p>

        {accepted && (
          <div className="mt-8 bg-green-100 rounded-xl p-5">
            <h2 className="text-2xl font-bold text-green-700">🎉 Rider Accepted!</h2>
            <p className="mt-3">{state?.rider?.name || "A rider"} accepted your booking.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Waiting;