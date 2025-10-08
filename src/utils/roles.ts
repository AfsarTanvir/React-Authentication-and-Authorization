export const ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  USER: "user",
  GUEST: "guest",
};

export const PERMISSIONS = {
  VIEW_DASHBOARD: "view_dashboard",
  VIEW_PRODUCTS: "view_products",
  EDIT_PRODUCT: "edit_product",
  DELETE_PRODUCT: "delete_product",
};


type Role = keyof typeof ROLES;
type Permission = keyof typeof PERMISSIONS;

export const ROLES_PERMISSIONS: Record<Role, Permission[]> = {
  ADMIN: ["VIEW_DASHBOARD", "VIEW_PRODUCTS", "EDIT_PRODUCT", "DELETE_PRODUCT"],
  MANAGER: ["VIEW_DASHBOARD", "VIEW_PRODUCTS", "EDIT_PRODUCT"],
  USER: ["VIEW_DASHBOARD", "VIEW_PRODUCTS"],
  GUEST: ["VIEW_DASHBOARD"],
};
