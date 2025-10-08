import { createContext, useContext, useState, type ReactNode } from "react";

export interface User {
  id: string;
  userName: string;
  password: string;
  role: string;
  permissions: string[];
}

interface AuthContextType{
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(()=>{
    const storeUser = localStorage.getItem("user");
    return storeUser ? JSON.parse(storeUser) : null;
  });

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission) || false;
  };
  
  return (
    <AuthContext value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
};