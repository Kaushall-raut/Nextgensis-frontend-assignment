import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Product from "./pages/Product";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Product />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;