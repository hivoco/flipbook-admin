import React, { useEffect, useRef, useState } from "react";
import { EMAIL, PASSWORD } from "../../constant";
import { useRouter } from "next/router";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const emailRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // useEffect(() => {
  //   const data = JSON.parse(localStorage.getItem("isUserLoggedIn"));
  //   if (data) {
  //     router.push("/admin");
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === EMAIL && password === PASSWORD) {
      localStorage.setItem("isUserLoggedIn", JSON.stringify(true));
      router.push("/admin");
    } else {
      setEmail("");
      setPassword("");
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-lg px-8 py-10 w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
          Sign In
        </h2>

        {/* Email Field */}
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-600 mb-2">
            Email Address
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="you@example.com"
            ref={emailRef}
          />
        </div>

        {/* Password Field */}
        <div className="mb-2">
          <label htmlFor="password" className="block text-gray-600 mb-2">
            Password
            <span className="text-red-500 ml-1">*</span>
          </label>
          <input
            autoComplete="true"
            type={showPassword ? "text" : "password"}
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="••••••••"
          />
        </div>

        {/* Show Password Toggle */}
        <div className="flex items-center mb-5">
          <input
            type="checkbox"
            id="showPassword"
            checked={showPassword}
            onChange={() => setShowPassword((prev) => !prev)}
            className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
          />
          <label htmlFor="showPassword" className="ml-2 text-gray-600 text-sm">
            {showPassword ? "Hide Password" : "Show Password"}
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition-colors"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
