import { Link } from "react-router-dom";
import { clearStoredSession, getStoredUser } from "../lib/api";

const Navbar = () => {
  const user = getStoredUser();

  const handleLogout = () => {
    clearStoredSession();
    window.location.href = "/";
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 gap-4">
        <Link to="/" className="text-2xl font-bold text-green-600">
          RiderLink
        </Link>

        <div className="hidden md:flex gap-8 text-gray-700">
          <Link to="/" className="hover:text-green-600">Home</Link>
          <Link to="/dashboard" className="hover:text-green-600">Dashboard</Link>
          <Link to="/login" className="hover:text-green-600">Account</Link>
        </div>

        <div className="flex gap-3 items-center">
          {user ? (
            <>
              <Link to="/dashboard" className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50">
                {user.name || "Profile"}
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50">
                Login
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;