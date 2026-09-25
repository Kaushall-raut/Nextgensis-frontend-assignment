import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="flex flex-col gap-4 bg-black px-6 py-4 text-white md:flex-row md:items-center md:justify-between">

      <Link
        to="/products"
        className="text-xl font-bold"
      >
        Product Admin
      </Link>

      <div className="flex items-center gap-3">

        <Link
          to="/products/new"
          className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black"
        >
          + Add Product
        </Link>

        <button
          onClick={handleLogout}
          className="rounded-lg border border-white px-4 py-2 text-sm"
        >
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;