import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import RiderCard from "../components/RiderCard";
import { apiFetch } from "../lib/api";

const Home = () => {
  const [filteredRiders, setFilteredRiders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRiders = async (filters = {}) => {
    setLoading(true);

    try {
      const params = new URLSearchParams(filters);
      const data = await apiFetch(`/api/riders?${params.toString()}`);
      setFilteredRiders(data.riders || []);
    } catch (error) {
      console.error("Failed to fetch riders:", error);
      setFilteredRiders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  return (
    <>
      <Navbar />
      <Hero setFilteredRiders={setFilteredRiders} fetchRiders={fetchRiders} />

      <section className="max-w-7xl mx-auto px-6 py-16">
<h2 className="text-4xl font-bold mb-10">Available Riders</h2>
<p className="text-gray-500 mb-8">
  {loading ? "Loading riders..." : `${filteredRiders.length} rider(s) found`}
</p>

{loading ? (
  <div className="text-gray-500">Loading available riders...</div>
) : (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
    {filteredRiders.map((rider) => (
      <RiderCard key={rider._id || rider.id} rider={rider} />
    ))}
  </div>
)}
      </section>
    </>
  );
};

export default Home;