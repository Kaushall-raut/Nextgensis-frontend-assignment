import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import ProductTable from "../components/ProductTable";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";

import { getProducts } from "../services/ProductApi";

function Product() {
  const [products, setProducts] = useState([]);

  const [total, setTotal] = useState(0);

  const [page, setPage] = useState(1);

  const [limit, setLimit] = useState(10);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const skip = (page - 1) * limit;

        const data = await getProducts(limit, skip);

        setProducts(data.products);
        setTotal(data.total);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);

    // Go back to page 1
    setPage(1);
  };

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

      <main className="min-h-screen bg-gray-50 p-4 md:p-8">

        <h1 className="mb-6 text-3xl font-bold">
          Products
        </h1>

        {/* Desktop table */}
        <ProductTable products={products} />

        {/* Mobile cards */}
        <div className="space-y-4 md:hidden">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

        {/* Pagination */}
        <Pagination
          page={page}
          total={total}
          limit={limit}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
        />

      </main>
    </>
  );
}

export default Product;