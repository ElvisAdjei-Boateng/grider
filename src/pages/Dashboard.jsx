import { Link, Navigate } from "react-router-dom";
import { getStoredUser } from "../lib/api";

const Dashboard = () => {
  const user = getStoredUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isRider = user.role === "rider";
  const isAdmin = user.role === "admin";

  return (
    <section className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-green-700">Dashboard</p>
            <h1 className="text-4xl font-bold mt-2">Welcome, {user.name}</h1>
          </div>
          <Link to="/" className="inline-block bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700">
            Browse riders
          </Link>
        </div>

        {isRider ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Available rides</p>
              <p className="text-3xl font-bold mt-2">12</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Completed deliveries</p>
              <p className="text-3xl font-bold mt-2">89</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Earnings this week</p>
              <p className="text-3xl font-bold mt-2">GH₵ 1450</p>
            </div>
          </div>
        ) : isAdmin ? (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Active riders</p>
              <p className="text-3xl font-bold mt-2">28</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Pending bookings</p>
              <p className="text-3xl font-bold mt-2">16</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-3xl font-bold mt-2">GH₵ 3640</p>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Bookings</p>
              <p className="text-3xl font-bold mt-2">3</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Saved riders</p>
              <p className="text-3xl font-bold mt-2">5</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow">
              <p className="text-sm text-gray-500">Favorite area</p>
              <p className="text-3xl font-bold mt-2">Accra</p>
            </div>
          </div>
        )}

        <div className="mt-10 bg-white rounded-2xl shadow p-6">
          <h2 className="text-2xl font-bold mb-4">Quick actions</h2>
          <div className="flex flex-wrap gap-4">
            <Link to="/" className="bg-green-50 text-green-700 px-4 py-3 rounded-lg font-medium">
              Find available riders
            </Link>
            <Link to="/waiting" className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg font-medium">
              View live status
            </Link>
            <Link to="/login" className="bg-white border border-gray-200 text-gray-800 px-4 py-3 rounded-lg font-medium">
              Switch account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
