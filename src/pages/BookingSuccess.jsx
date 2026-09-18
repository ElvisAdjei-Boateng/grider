import { Link, useLocation } from "react-router-dom";

const BookingSuccess = () => {
  const { state } = useLocation();

  return (
    <section className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg">
        <div className="text-7xl">✅</div>

        <h1 className="text-4xl font-bold mt-6">Booking Submitted</h1>
        <p className="mt-5 text-gray-600">Your booking has been sent successfully.</p>

        <Link
          to="/waiting"
          state={state}
          className="mt-8 inline-block bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-700"
        >
          Continue
        </Link>
      </div>
    </section>
  );
};

export default BookingSuccess;