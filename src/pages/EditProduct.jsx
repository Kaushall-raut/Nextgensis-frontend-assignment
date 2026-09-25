import { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductForm from "../components/ProductForm";

import {
  getProductById,
  updateProduct,
} from "../services/ProductApi";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError("");

        const data =
          await getProductById(id);

        setProduct(data);
      } catch (error) {
        setError(
          "Product not found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (
    productData
  ) => {
    if (saving) return;

    try {
      setSaving(true);
      setError("");

      await updateProduct(
        id,
        productData
      );

      navigate(
        `/products/${id}`
      );
    } catch (error) {
      setError(
        "Failed to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="p-8">
          <p>Loading product...</p>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8">

          <div className="rounded-lg bg-white p-10 text-center shadow">

            <h1 className="mb-3 text-3xl font-bold">
              Product Not Found
            </h1>

            <Link
              to="/products"
              className="rounded-lg bg-black px-5 py-3 text-white"
            >
              Back to Products
            </Link>

          </div>

        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 p-4 md:p-8">

        <div className="mx-auto max-w-3xl">

          <Link
            to={`/products/${id}`}
            className="mb-6 inline-block text-sm font-medium text-gray-600 hover:text-black"
          >
            ← Back to Product
          </Link>

          <h1 className="mb-6 text-3xl font-bold">
            Edit Product
          </h1>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </div>
          )}

          <ProductForm
            initialData={product}
            onSubmit={handleSubmit}
            loading={saving}
            submitText="Update Product"
          />

        </div>

      </main>
    </>
  );
}

export default EditProduct;