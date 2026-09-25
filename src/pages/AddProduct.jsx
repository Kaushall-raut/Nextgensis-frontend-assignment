import { useEffect, useState } from "react";
import {
  Link,
  useParams,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import { getProductById } from "../services/ProductApi";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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
        setProduct(null);
        setError(
          "Product not found"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />

        <main className="min-h-screen bg-gray-50 p-8">
          <div className="rounded-lg bg-white p-8 text-center shadow">
            Loading product...
          </div>
        </main>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-screen items-center justify-center bg-gray-50 p-8">

          <div className="rounded-lg bg-white p-10 text-center shadow">

            <h1 className="mb-3 text-3xl font-bold">
              Product Not Found
            </h1>

            <p className="mb-6 text-gray-500">
              The product you're looking for does not exist.
            </p>

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

        <div className="mx-auto max-w-7xl">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

            <Link
              to="/products"
              className="text-sm font-medium text-gray-600 hover:text-black"
            >
              ← Back to Products
            </Link>

            <Link
              to={`/products/${id}/edit`}
              className="rounded-lg bg-black px-5 py-2.5 text-sm font-medium text-white"
            >
              Edit Product
            </Link>

          </div>

          <div className="rounded-xl bg-white p-6 shadow md:p-8">

            <div className="grid gap-8 md:grid-cols-2">

              <div>

                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="h-80 w-full rounded-lg bg-gray-100 object-contain"
                />

                {product.images?.length > 1 && (
                  <div className="mt-4 grid grid-cols-4 gap-3">

                    {product.images.map(
                      (image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`${product.title} ${index + 1}`}
                          className="h-20 w-full rounded border object-cover"
                        />
                      )
                    )}

                  </div>
                )}

              </div>

              <div>

                <p className="mb-2 text-sm uppercase text-gray-500">
                  {product.category}
                </p>

                <h1 className="mb-4 text-3xl font-bold">
                  {product.title}
                </h1>

                <p className="mb-6 text-gray-600">
                  {product.description}
                </p>

                <div className="mb-6 text-3xl font-bold">
                  ${product.price}
                </div>

                <div className="space-y-3">

                  <div>
                    <span className="font-semibold">
                      Rating:
                    </span>{" "}
                    ⭐ {product.rating}
                  </div>

                  <div>
                    <span className="font-semibold">
                      Stock:
                    </span>{" "}
                    {product.stock}
                  </div>

                  {product.brand && (
                    <div>
                      <span className="font-semibold">
                        Brand:
                      </span>{" "}
                      {product.brand}
                    </div>
                  )}

                </div>

              </div>

            </div>

            <div className="mt-10 border-t pt-8">

              <h2 className="mb-6 text-2xl font-bold">
                Reviews
              </h2>

              {product.reviews &&
              product.reviews.length > 0 ? (
                <div className="space-y-4">

                  {product.reviews.map(
                    (review, index) => (
                      <div
                        key={index}
                        className="rounded-lg border p-5"
                      >

                        <div className="mb-2 flex flex-col justify-between gap-2 md:flex-row">

                          <h3 className="font-semibold">
                            {review.reviewerName}
                          </h3>

                          <span className="text-sm text-gray-500">
                            {review.date}
                          </span>

                        </div>

                        <p className="mb-2">
                          {"⭐".repeat(
                            review.rating
                          )}
                        </p>

                        <p className="text-gray-600">
                          {review.comment}
                        </p>

                      </div>
                    )
                  )}

                </div>
              ) : (
                <p className="text-gray-500">
                  No reviews available.
                </p>
              )}

            </div>

          </div>

        </div>

      </main>
    </>
  );
}

export default ProductDetails;