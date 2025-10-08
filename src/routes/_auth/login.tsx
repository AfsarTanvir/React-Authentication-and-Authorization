import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { login } from "../../api";
import { useAuth } from "../../context/AuthContext";

export const Route = createFileRoute("/_auth/login")({
  component: RouteComponent,
});

function RouteComponent() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState("");
  const {login: authLogin} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName) return alert("Invalid credentials..");
    const user = await login(userName, password);

    if (user) {
      authLogin(user);
      navigate({ to: "/dashboard" });
    } else {
      alert("Invalid credentials, invalid password");
      setPassword("");
    }
  };
  return (
    <div className="flex flex-col items-center p-10">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <div className="md:flex md:items-center mb-5">
          <label className="md:w-1/3 block text-gray-300 font-bold">
            UserName
          </label>
          <input
            className="md:w-2/3 border rounded w-full py-2 px-3"
            type="text"
            value={userName}
            placeholder="Please Enter User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="md:flex md:items-center mb-6">
          <label className="md:w-1/3 block text-gray-300 font-bold">
            Password
          </label>
          <input
            className="md:w-2/3 border rounded w-full py-2 px-3"
            type="password"
            value={password}
            placeholder="Please Enter User Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="bg-blue-400 md:flex md:justify-start">
          <button
            type="submit"
            className="text-2xl bg-blue-200 border rounded text-white p-2 w-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
