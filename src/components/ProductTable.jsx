import { Link } from "react-router-dom";

function ProductTable({ products }) {
  return (
    <div className="hidden overflow-x-auto md:block">

      <table className="w-full border-collapse">

        <thead>
          <tr className="border-b bg-gray-100">

            <th className="p-4 text-left">
              Image
            </th>

            <th className="p-4 text-left">
              Title
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Price
            </th>

            <th className="p-4 text-left">
              Rating
            </th>

            <th className="p-4 text-left">
              Stock
            </th>

          </tr>
        </thead>

        <tbody>

          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4">
                <Link
                  to={`/products/${product.id}`}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="h-14 w-14 rounded object-cover"
                  />
                </Link>
              </td>

              <td className="p-4 font-medium">
                <Link
                  to={`/products/${product.id}`}
                  className="hover:underline"
                >
                  {product.title}
                </Link>
              </td>

              <td className="p-4">
                {product.category}
              </td>

              <td className="p-4">
                ${product.price}
              </td>

              <td className="p-4">
                ⭐ {product.rating}
              </td>

              <td className="p-4">
                {product.stock}
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ProductTable;