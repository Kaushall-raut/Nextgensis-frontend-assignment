import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/Navbar";
import ProductTable from "../components/ProductTable";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import ProductFilters from "../components/ProductFilters";

import {
  getProducts,
  searchProducts,
  getCategories,
  getProductsByCategory,
} from "../services/ProductApi";

function Product() {
  const [searchParams, setSearchParams] =
    useSearchParams();

  const pageFromUrl =
    Number(searchParams.get("page")) || 1;

  const limitFromUrl =
    Number(searchParams.get("limit")) || 10;

  const searchFromUrl =
    searchParams.get("search") || "";

  const categoryFromUrl =
    searchParams.get("category") || "";

  const sortFromUrl =
    searchParams.get("sort") || "";

  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);

  const [page, setPage] =
    useState(pageFromUrl);

  const [limit, setLimit] =
    useState([10, 20, 50].includes(limitFromUrl)
      ? limitFromUrl
      : 10);

  const [search, setSearch] =
    useState(searchFromUrl);

  const [debouncedSearch, setDebouncedSearch] =
    useState(searchFromUrl);

  const [categories, setCategories] =
    useState([]);

  const [category, setCategory] =
    useState(categoryFromUrl);

  const [sort, setSort] =
    useState(sortFromUrl);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /*
   * Debounce search
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /*
   * Update URL when search changes
   */
  useEffect(() => {
    const params =
      new URLSearchParams(searchParams);

    if (debouncedSearch) {
      params.set(
        "search",
        debouncedSearch
      );
    } else {
      params.delete("search");
    }

    params.set("page", "1");

    setPage(1);

    setSearchParams(params);
  }, [debouncedSearch]);

  /*
   * Load categories
   */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data =
          await getCategories();

        setCategories(data);
      } catch (error) {
        console.error(
          "Failed to load categories",
          error
        );
      }
    };

    fetchCategories();
  }, []);

  /*
   * Load products
   */
  useEffect(() => {
    const controller =
      new AbortController();

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const skip =
          (page - 1) * limit;

        let data;

        /*
         * Search has priority.
         */
        if (debouncedSearch) {
          data = await searchProducts(
            debouncedSearch,
            limit,
            skip,
            controller.signal
          );
        }

        /*
         * Category is used when
         * search is empty.
         */
        else if (category) {
          data =
            await getProductsByCategory(
              category,
              limit,
              skip
            );
        }

        /*
         * Normal products.
         */
        else {
          data = await getProducts(
            limit,
            skip
          );
        }

        let sortedProducts =
          [...data.products];

        /*
         * Sorting
         */
        if (sort === "price-asc") {
          sortedProducts.sort(
            (a, b) =>
              a.price - b.price
          );
        }

        if (sort === "price-desc") {
          sortedProducts.sort(
            (a, b) =>
              b.price - a.price
          );
        }

        if (sort === "rating-desc") {
          sortedProducts.sort(
            (a, b) =>
              b.rating - a.rating
          );
        }

        if (sort === "title-asc") {
          sortedProducts.sort(
            (a, b) =>
              a.title.localeCompare(
                b.title
              )
          );
        }

        if (sort === "title-desc") {
          sortedProducts.sort(
            (a, b) =>
              b.title.localeCompare(
                a.title
              )
          );
        }

        setProducts(sortedProducts);
        setTotal(data.total);
      } catch (error) {
        if (
          error.name ===
            "CanceledError" ||
          error.code === "ERR_CANCELED"
        ) {
          return;
        }

        setError(
          "Failed to load products"
        );
      } finally {
        if (
          !controller.signal.aborted
        ) {
          setLoading(false);
        }
      }
    };

    fetchProducts();

    return () => {
      controller.abort();
    };
  }, [
    page,
    limit,
    debouncedSearch,
    category,
    sort,
  ]);

  /*
   * Page change
   */
  const handlePageChange = (
    newPage
  ) => {
    const totalPages =
      Math.ceil(total / limit);

    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }

    setPage(newPage);

    const params =
      new URLSearchParams(
        searchParams
      );

    params.set(
      "page",
      String(newPage)
    );

    setSearchParams(params);
  };

  /*
   * Page size change
   */
  const handleLimitChange = (
    newLimit
  ) => {
    setLimit(newLimit);
    setPage(1);

    const params =
      new URLSearchParams(
        searchParams
      );

    params.set(
      "limit",
      String(newLimit)
    );

    params.set("page", "1");

    setSearchParams(params);
  };

  /*
   * Category change
   */
  const handleCategoryChange = (
    newCategory
  ) => {
    setCategory(newCategory);
    setPage(1);

    const params =
      new URLSearchParams(
        searchParams
      );

    if (newCategory) {
      params.set(
        "category",
        newCategory
      );
    } else {
      params.delete("category");
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  /*
   * Sort change
   */
  const handleSortChange = (
    newSort
  ) => {
    setSort(newSort);
    setPage(1);

    const params =
      new URLSearchParams(
        searchParams
      );

    if (newSort) {
      params.set(
        "sort",
        newSort
      );
    } else {
      params.delete("sort");
    }

    params.set("page", "1");

    setSearchParams(params);
  };

  /*
   * Retry
   */
  const handleRetry = () => {
    setError("");

    /*
     * Change page state to trigger
     * the fetch effect again.
     */
    setPage((currentPage) =>
      currentPage === 1
        ? 2
        : 1
    );
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50 p-4 md:p-8">

        <div className="mx-auto max-w-7xl">

          <h1 className="mb-6 text-3xl font-bold">
            Products
          </h1>

          <SearchBar
            value={search}
            onChange={setSearch}
          />

          <ProductFilters
            category={category}
            categories={categories}
            sort={sort}
            onCategoryChange={
              handleCategoryChange
            }
            onSortChange={
              handleSortChange
            }
          />

          {loading && (
            <div className="rounded-lg bg-white p-8 text-center shadow">
              <p>
                Loading products...
              </p>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-lg bg-white p-8 text-center shadow">

              <p className="mb-4 text-red-500">
                {error}
              </p>

              <button
                onClick={handleRetry}
                className="rounded-lg bg-black px-5 py-2 text-white"
              >
                Retry
              </button>

            </div>
          )}

          {!loading &&
            !error &&
            products.length === 0 && (
              <div className="rounded-lg bg-white p-8 text-center shadow">
                <p className="text-gray-500">
                  No products found.
                </p>
              </div>
            )}

          {!loading &&
            !error &&
            products.length > 0 && (
              <>
                <ProductTable
                  products={products}
                />

                <div className="space-y-4 md:hidden">
                  {products.map(
                    (product) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                      />
                    )
                  )}
                </div>

                <Pagination
                  page={page}
                  total={total}
                  limit={limit}
                  onPageChange={
                    handlePageChange
                  }
                  onLimitChange={
                    handleLimitChange
                  }
                />
              </>
            )}

        </div>

      </main>
    </>
  );
}

export default Product;