import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiFetch } from "../lib/api";

const RiderProfile = () => {
  const { id } = useParams();
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRider = async () => {
      try {
        const data = await apiFetch(`/api/riders/${id}`);
        setRider(data.rider);
      } catch (error) {
        console.error("Failed to load rider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRider();
  }, [id]);

  if (loading) {
    return <h1 className="text-center text-3xl mt-20">Loading rider...</h1>;
  }

  if (!rider) {
    return <h1 className="text-center text-3xl mt-20">Rider not found</h1>;
  }

  const riderId = rider._id || rider.id;
  const profileImage = rider.profileImage || rider.image || "https://images.unsplash.com/photo-1507679799987-c73779587ccf";

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid lg:grid-cols-2 gap-12">
        <img src={profileImage} alt={rider.name} className="rounded-3xl shadow-xl" />

        <div>
          <h1 className="text-5xl font-bold">{rider.name}</h1>
          <p className="mt-4 text-xl">⭐ {rider.rating || 4.8}</p>
          <p className="mt-2">📍 {rider.location}</p>
          <p className="mt-2">🚴 {rider.ride}</p>
          <p className="mt-2">📦 {rider.deliveryType}</p>
          <p className="mt-2">🚚 {rider.deliveries || 0} Deliveries Completed</p>

          <div className="mt-8">
            <span
              className={`px-4 py-2 rounded-full ${
                rider.available !== false ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
              }`}
            >
              {rider.available !== false ? "Available" : "Unavailable"}
            </span>
          </div>

          <p className="mt-10 text-gray-600 leading-8">
            Experienced delivery rider with years of experience delivering food, groceries,
            documents and parcels safely and on time.
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              to={`/booking/${riderId}`}
              className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700"
            >
              Hire Rider
            </Link>

            <button className="border border-green-600 text-green-600 px-8 py-4 rounded-lg hover:bg-green-50">
              Message Rider
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiderProfile;