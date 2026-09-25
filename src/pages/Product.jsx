import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductTable from "../components/ProductTable";
import ProductCard from "../components/ProductCard";

import { getProducts } from "../services/ProductApi";

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts(10, 0);

        setProducts(data.products);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="p-8">
          <p>Loading products...</p>
        </main>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />

        <main className="p-8">
          <p className="text-red-500">
            {error}
          </p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="bg-gray-50 min-h-screen p-4 md:p-8">

        <h1 className="mb-6 text-3xl font-bold">
          Products
        </h1>

        {/* Desktop */}
        <ProductTable products={products} />

        {/* Mobile */}
        <div className="space-y-4 md:hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </main>
    </>
  );
}

export default Product;