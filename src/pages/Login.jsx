import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/ProductApi";


function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple requests
    if (loading) return;

    setError("");

    // Basic validation
    if (!username || !password) {
      setError("Username and password are required");
      return;
    }

    setLoading(true);

    try {
      const data = await loginUser(username, password);

      // Store token
      localStorage.setItem("token", data.accessToken);

      // Redirect to products
      navigate("/products");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-3xl font-bold text-center mb-6">
          Product Admin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Username */}
          <div>
            <label className="block mb-2 font-medium">
              Username
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="mt-6 text-sm text-gray-500">
          <p>Demo credentials:</p>
          <p>Username: emilys</p>
          <p>Password: emilyspass</p>
        </div>

      </div>
    </div>
  );
}

export default Login;