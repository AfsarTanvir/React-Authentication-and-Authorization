import axios from "axios";
import type { User } from "../context/AuthContext";

const API_URI = "http://localhost:3000";

export interface Product {
  id: string;
  name: string;
  price: number;
}

// Login User
export const login = async (
  userName: string,
  password: string
): Promise<User | null> => {
  try {
    const response = await axios.get<User[]>(`${API_URI}/users`, {
      params: { userName, password },
    });
    return response.data[0] || null;
  } catch (error) {
    console.log("Login failed, " + error);
    return null;
  }
};

// Fetch Products
export const getProducts = async (): Promise<Product[] | null> => {
  try {
    const response = await axios.get<Product[]>(`${API_URI}/products`);
    return response.data;
  } catch (error) {
    console.log("Failed to fetch products, " + error);
    return null;
  }
};

// Delete Product
export const deleteProducts = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URI}/products/${id}`);
  } catch (error) {
    console.log("Failed to delete product, " + error);
  }
};

// Add New Product
export const addNewProduct = async (product: Product): Promise<void> => {
  try {
    await axios.post(`${API_URI}/products`, product);
  } catch (e) {
    console.log("Failed to add product, " + e);
  }
};

// Product Info
export const productInfo = async (id: string): Promise<Product | null> => {
  try {
    const response = await axios.get<Product[]>(`${API_URI}/products`, {
      params: { id },
    });
    console.log(response.data[0]);
    return response.data[0] || null;
  }catch(error){
    console.log("Faild to fatch " + id + " from database. " + error);
    return null;
  }
}


// Update Product
export const updateProduct = async (product: Product): Promise<void> => {
  try {
    await axios.put(`${API_URI}/products/${product.id}`, product);
  } catch (e) {
    console.log("Failed to Update product, " + e);
  }
};