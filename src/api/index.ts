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