import { Link } from "react-router-dom";

const RiderCard = ({ rider }) => {
  const riderId = rider._id || rider.id;
  const profileImage = rider.profileImage || rider.image || "https://images.unsplash.com/photo-1507679799987-c73779587ccf";

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl hover:-translate-y-2 transition">
      <img src={profileImage} alt={rider.name} className="w-full h-56 object-cover" />

      <div className="p-5">
        <h2 className="text-xl font-bold">{rider.name}</h2>
        <p className="text-gray-500 mt-1">{rider.location}</p>
        <p className="mt-2">{rider.ride}</p>
        <p>{rider.deliveryType}</p>

        <p className="mt-2 text-green-600 font-semibold">⭐ {rider.rating || 4.8}</p>
        <p className="text-gray-500">{rider.deliveries || 0} Deliveries</p>

        <Link
          to={`/riders/${riderId}`}
          className="block mt-5 bg-green-600 text-white text-center py-3 rounded-lg hover:bg-green-700"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default RiderCard;