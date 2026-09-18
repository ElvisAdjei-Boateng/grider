import { useState } from "react";
import { apiFetch } from "../lib/api";

const Hero = ({ setFilteredRiders, fetchRiders }) => {
  const [location, setLocation] = useState("");
  const [ride, setRide] = useState("Motorcycle");
  const [deliveryType, setDeliveryType] = useState("Food");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);

    try {
     const params = new URLSearchParams();
     if (location) params.set("location", location);
     if (ride) params.set("ride", ride);
     if (deliveryType) params.set("deliveryType", deliveryType);

     const data = await apiFetch(`/api/riders?${params.toString()}`);
     setFilteredRiders(data.riders || []);
    } catch (error) {
     console.error("Search failed:", error);
     setFilteredRiders([]);
    } finally {
     setLoading(false);
    }
  };

  const clearFilters = () => {
    setLocation("");
    setRide("Motorcycle");
    setDeliveryType("Food");
    fetchRiders();
  };
  return (
    <section className="bg-green-50 py-24">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-5xl font-bold leading-tight">
           Find Trusted
           <span className="text-green-600"> Delivery Riders </span>
           Near You
          </h1>

          <p className="mt-6 text-gray-600 text-lg">
           Connect with reliable delivery riders for food, parcels, groceries, and business deliveries.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4">
           <input
             type="text"
             placeholder="Enter your location..."
             value={location}
             onChange={(e) => setLocation(e.target.value)}
             className="flex-1 px-5 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-green-500"
           />

           <select
             value={ride}
             onChange={(e) => setRide(e.target.value)}
             className="border rounded-lg p-3"
           >
             <option>Motorcycle</option>
             <option>Bike</option>
             <option>Car</option>
           </select>

           <select
             value={deliveryType}
             onChange={(e) => setDeliveryType(e.target.value)}
             className="border rounded-lg p-3"
           >
             <option>Food</option>
             <option>Parcel</option>
             <option>Groceries</option>
           </select>
          </div>

          <div className="mt-5 flex gap-3">
           <button
             onClick={handleSearch}
             className="flex-1 bg-green-600 hover:bg-green-700 transition text-white rounded-lg py-4 font-semibold"
           >
             {loading ? "Searching..." : "Find Rider"}
           </button>

           <button
             onClick={clearFilters}
             className="px-5 py-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-white"
           >
             Clear
           </button>
          </div>
        </div>

        <div>
          <img
           src="https://images.unsplash.com/photo-1556740749-887f6717d7e4"
           alt="Delivery Rider"
           className="rounded-2xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;