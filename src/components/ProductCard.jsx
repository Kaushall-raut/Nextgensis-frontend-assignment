import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="block rounded-lg border bg-white p-4 shadow-sm transition hover:shadow-md"
    >

      <div className="flex gap-4">

        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-20 w-20 rounded object-cover"
        />

        <div className="flex-1">

          <h2 className="font-semibold">
            {product.title}
          </h2>

          <p className="text-sm text-gray-500">
            {product.category}
          </p>

          <p className="mt-2 font-semibold">
            ${product.price}
          </p>

        </div>

      </div>

      <div className="mt-4 flex justify-between text-sm">

        <span>
          ⭐ {product.rating}
        </span>

        <span>
          Stock: {product.stock}
        </span>

      </div>

    </Link>
  );
}

export default ProductCard;