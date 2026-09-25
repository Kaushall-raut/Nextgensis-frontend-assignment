import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between bg-black px-8 py-4 text-white">

      <h1 className="text-xl font-bold">
        Product Admin
      </h1>

      <button
        onClick={handleLogout}
        className="rounded bg-white px-4 py-2 text-black"
      >
        Logout
      </button>

    </nav>
  );
}

export default Navbar;