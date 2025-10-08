import { createFileRoute, useNavigate } from "@tanstack/react-router";
import ProtectedRoutes from "../../components/ProtectedRoutes";
import { PERMISSIONS } from "../../utils/roles";
import { addNewProduct, deleteProducts, getProducts, type Product } from "../../api";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export const Route = createFileRoute("/_protected/products")({
  component: () => (
    <ProtectedRoutes permissions={[PERMISSIONS.VIEW_PRODUCTS]}>
      <RouteComponent />
    </ProtectedRoutes>
  ),
  loader: async () => {
    return await getProducts();
  },
});

function RouteComponent() {
  const { hasPermission } = useAuth();
  const products = Route.useLoaderData();
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  const [product, setProduct] = useState({
    id: `product ${products?.length ? products.length + 1 : 1}`,
    name: "",
    price: 0,
  });
  async function handleDelete(
    id: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    console.log(e, id);
    e.preventDefault();
    if (!hasPermission(PERMISSIONS.DELETE_PRODUCT)) {
      navigate({ to: "/unauthorized" });
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteProducts(id);
      products?.filter((product) => product.id !== id);
    }
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Product Added:", product);

    await addNewProduct(product);

    setShowForm(false);
    setProduct({ id: "", name: "", price: 0});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold mb-2">Products</h2>
      <p className="text-gray-800">here is the Product</p>
      <div className="flex justify-end p-5">
        <button
          className="bg-blue-500 p-2"
          type="button"
          onClick={() => setShowForm(true)}
        >
          Add Product
        </button>
      </div>
      {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black">
          <div className="bg-white p-6 rounded-lg w-[400px] shadow-lg relative">
            <h2 className="text-xl mb-4 font-semibold">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                name="name"
                value={product.name}
                onChange={handleChange}
                placeholder="Product Name"
                required
                className="border p-2 w-full rounded"
              />
              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="Price"
                required
                className="border p-2 w-full rounded"
              />

              <div className="flex justify-end gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <ul className="bg-amber-400 md:flex md:flex-wrap gap-3 p-2">
          {products?.map((product: Product) => (
            <li
              key={product.id}
              className="text-gray-600 border-gray-300 border p-5 w-80"
            >
              <p>Product Name: {product.name}</p>
              <p>Price: ${product.price}</p>
              {hasPermission(PERMISSIONS.EDIT_PRODUCT) && (
                <button
                  className="bg-blue-500 rounded-full px-5 py-1.5 text-white mr-3 ml-3"
                  type="button"
                  onClick={() => alert(`Edit: ${product.name}`)}
                >
                  Edit
                </button>
              )}

              {hasPermission(PERMISSIONS.DELETE_PRODUCT) && (
                <button
                  className="bg-red-800 rounded-full px-5 py-1.5 text-white"
                  type="button"
                  onClick={(e) => handleDelete(product.id, e)}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
