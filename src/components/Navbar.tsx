import { Link, useMatchRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate({ to: "/dashboard" });
  }
  const matchRoute = useMatchRoute();
  const isLoginPage = matchRoute({to: "/login"});

  return (
    <nav className="hidden md:flex space-x-6 mx-4 py-3">
      {user ? (
        <>
          <Link to={"/dashboard"}>dashboard</Link>
          <Link to={"/products"}>Products</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {isLoginPage ? (
            <Link to={"/dashboard"}>dashboard</Link>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </>
      )}
    </nav>
  );
}

export default Navbar;
