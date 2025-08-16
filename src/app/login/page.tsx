"use client";
import { FiEye } from "react-icons/fi";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LecturerLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

  // Update login logic in login page
    const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === "lecturer@gmail.com" && password === "lecturer") {
        localStorage.setItem("lecturer_logged_in", "true");
        router.push("/dashboard");
    } else {
        alert("Invalid credentials. Please try again.");
    }
    };

    return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-green-50 relative">
      {/* Logo Section - moved to top center */}
        <div className="flex flex-col items-center absolute top-12 left-0 right-0 mx-auto">
        <div className="w-20 h-20 mb-2 flex items-center justify-center bg-white rounded-full shadow mx-auto">
            <img
            src="/img/logo.jpeg"
            alt="Logo"
            className="w-16 h-16 object-contain"
            />
        </div>
        <h1 className="text-2xl font-bold text-[#026892]">SAMPS UR</h1>
        <p className="text-sm text-gray-600">
            Student Academic Management Platform
        </p>
        </div>

      {/* Login Form */}
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col items-center mt-40">
        <h2 className="text-xl font-bold mb-2 text-center text-black">
            Lecturer Login
        </h2>
        <form className="w-full flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="mb-4">
            <label className="block text-base font-semibold text-[#026892] mb-2 tracking-wide">
                Email
            </label>
            <input
                type="text"
                placeholder="Enter your Staff ID"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#026892] focus:border-[#026892] text-gray-700 placeholder-gray-400 transition"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            </div>
            <div className="mb-4">
            <label className="block text-base font-semibold text-[#026892] mb-2 tracking-wide">
                Password
            </label>
            <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#026892] focus:border-[#026892] text-gray-700 placeholder-gray-400 transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                />
                <span
                className="absolute right-3 top-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword((v) => !v)}
                title={showPassword ? "Hide password" : "Show password"}
                >
                <FiEye size={20} />
                </span>
            </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-2 mb-2">
            <label className="flex items-center text-sm font-medium text-gray-700 bg-gray-50 px-2 py-1 rounded shadow-sm">
                <input type="checkbox" className="mr-2 accent-[#026892]" />
                Remember me
            </label>
            <a
                href="#"
                className="text-sm text-blue-600 hover:underline text-[#026892] mt-2 sm:mt-0"
            >
                Forgot Password?
            </a>
            </div>
            <button
            type="submit"
            className="w-full py-2 bg-[#026892] text-white font-semibold rounded shadow hover:bg-[#035a6d] transition"
            >
            Sign In
            </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
            <span>Need help?</span>
            <div className="flex justify-center gap-4 mt-1">
            <a href="#" className="text-blue-600 hover:underline">
                Contact Support
            </a>
            <a href="#" className="text-blue-600 hover:underline">
                Help Center
            </a>
            </div>
        </div>
        </div>

      {/* Footer  */}
        <footer className="mt-8 text-xs text-gray-400 text-center">
        &copy; 2025 University of Rwanda. All rights reserved.
        </footer>
    </main>
    );
}
