import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sending POST request to the backend login API
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      // Log the status for debugging
      console.log("Response status:", response.status);

      // Use response.json() only once
      if (response.ok) {
        const data = await response.json(); // Get the JSON data directly
        console.log("Login success:", data);

        // Store the user data (e.g., token or user info) in sessionStorage or localStorage
        sessionStorage.setItem("user", JSON.stringify(data));

        // Redirect to the homepage or secure route after successful login
        router.push("/");
      } else {
        // If the response is not OK, get the error message from the response
        const errorData = await response.json(); // Get the error JSON data
        console.error("Login error:", errorData);
        setError(errorData.error || "Login failed.");
      }
    } catch (err) {
      // If any unexpected error occurs, log it
      console.error("Unexpected error:", err);
      setError("An error occurred while logging in.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-primary">
      <div className="bg-lightPink p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 text-darkText border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-primary text-white rounded-lg hover:bg-lightPink focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
