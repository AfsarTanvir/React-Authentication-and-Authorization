import { createFileRoute, useNavigate } from '@tanstack/react-router'
import ProtectedRoutes from '../../components/ProtectedRoutes';
import { PERMISSIONS } from '../../utils/roles';
import { deleteProducts, getProducts, type Product } from '../../api';
import { useAuth } from '../../context/AuthContext';

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
  const { hasPermission} = useAuth();
  const products = Route.useLoaderData();
  const navigate = useNavigate();
  async function handleDelete(id: string, e: React.MouseEvent) {
    console.log(e, id);
    e.preventDefault();
    if (!hasPermission(PERMISSIONS.DELETE_PRODUCT)) {
      navigate({ to: "/unauthorized" });
      return;
    }

    if(window.confirm("Are you sure you want to delete this product?")){
      await deleteProducts(id);
      products?.filter((product) => product.id !== id);
    }
  }
  return (
    <div className="p-10">
      <h2 className="text-4xl font-bold mb-2">Products</h2>
      <p className="text-gray-800">here is the Product</p>
      <ul className="md:flex md:flex-wrap gap-3 p-2">
        {products?.map((product: Product) => (
          <li
            key={product.id}
            className="text-gray-600 border-gray-300 border p-2 md: w-1/3"
          >
            <p>Product Name: {product.name}</p>
            <p>Price: ${product.price}</p>
            <button
              className="bg-blue-500 rounded-full px-5 py-1.5 text-white mr-3 ml-3"
              type="button"
              onClick={() => alert(`Edit: ${product.name}`)}
            >
              Edit
            </button>
            <button
              className="bg-red-800 rounded-full px-5 py-1.5 text-white"
              type="button"
              onClick={(e) => handleDelete(product.id, e)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
