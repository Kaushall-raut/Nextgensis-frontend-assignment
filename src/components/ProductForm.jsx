import { useState } from "react";

function ProductForm({
  initialData,
  onSubmit,
  loading,
  submitText = "Save Product",
}) {
  const [title, setTitle] = useState(
    initialData?.title || ""
  );

  const [description, setDescription] =
    useState(
      initialData?.description || ""
    );

  const [price, setPrice] = useState(
    initialData?.price ?? ""
  );

  const [category, setCategory] =
    useState(
      initialData?.category || ""
    );

  const [stock, setStock] = useState(
    initialData?.stock ?? ""
  );

  const [thumbnail, setThumbnail] =
    useState(
      initialData?.thumbnail || ""
    );

  const [errors, setErrors] =
    useState({});

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title =
        "Title is required";
    }

    if (!description.trim()) {
      newErrors.description =
        "Description is required";
    }

    if (
      price === "" ||
      Number(price) <= 0
    ) {
      newErrors.price =
        "Price must be greater than 0";
    }

    if (!category.trim()) {
      newErrors.category =
        "Category is required";
    }

    if (
      stock === "" ||
      Number(stock) < 0
    ) {
      newErrors.stock =
        "Stock cannot be negative";
    }

    if (!thumbnail.trim()) {
      newErrors.thumbnail =
        "Image URL is required";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors).length === 0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const isValid = validate();

    if (!isValid) {
      return;
    }

    const productData = {
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      category: category.trim(),
      stock: Number(stock),
      thumbnail: thumbnail.trim(),
    };

    await onSubmit(productData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow md:p-8"
    >

      {/* Title */}
      <div>
        <label className="mb-2 block font-medium">
          Product Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          placeholder="Enter product title"
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-500">
            {errors.title}
          </p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
          placeholder="Enter product description"
          rows="5"
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description}
          </p>
        )}
      </div>

      {/* Price */}
      <div>
        <label className="mb-2 block font-medium">
          Price
        </label>

        <input
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
          placeholder="Enter price"
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.price && (
          <p className="mt-1 text-sm text-red-500">
            {errors.price}
          </p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block font-medium">
          Category
        </label>

        <input
          type="text"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          placeholder="Enter category"
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.category && (
          <p className="mt-1 text-sm text-red-500">
            {errors.category}
          </p>
        )}
      </div>

      {/* Stock */}
      <div>
        <label className="mb-2 block font-medium">
          Stock
        </label>

        <input
          type="number"
          min="0"
          value={stock}
          onChange={(e) =>
            setStock(e.target.value)
          }
          placeholder="Enter stock"
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.stock && (
          <p className="mt-1 text-sm text-red-500">
            {errors.stock}
          </p>
        )}
      </div>

      {/* Image */}
      <div>
        <label className="mb-2 block font-medium">
          Image URL
        </label>

        <input
          type="url"
          value={thumbnail}
          onChange={(e) =>
            setThumbnail(e.target.value)
          }
          placeholder="https://example.com/image.jpg"
          className="w-full rounded-lg border px-4 py-3"
        />

        {errors.thumbnail && (
          <p className="mt-1 text-sm text-red-500">
            {errors.thumbnail}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-black px-5 py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : submitText}
      </button>

    </form>
  );
}

export default ProductForm;