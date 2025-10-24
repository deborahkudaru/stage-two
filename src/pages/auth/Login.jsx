import { useState, useContext } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const nav = useNavigate();
  const [qs] = useSearchParams();
  const msg = qs.get("m");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const err = {};
    if (!form.email) {
      err.email = "Email is required";
    } else if (!form.email.includes("@")) {
      err.email = "Enter a valid email address";
    }

    if (!form.password) {
      err.password = "Password is required";
    } else if (form.password.length < 6) {
      err.password = "Password must be at least 6 characters";
    }

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await login({ email: form.email, password: form.password });
      toast.success("Login successful");
      nav("/dashboard");
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
      // attach server error to password field for user visibility
      setErrors({ ...errors, password: err.message || "Invalid credentials" });
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        {msg === "session_expired" && (
          <div className="text-red-700 px-4 py-3 rounded mb-6">
            Your session has expired — please log in again.
          </div>
        )}

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* EMAIL FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-slate-600 focus:border-transparent"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className={`w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-colors ${
                errors.password
                  ? "border-red-400 focus:ring-red-300"
                  : "border-gray-300 focus:ring-slate-600 focus:border-transparent"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Login In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/auth/signup"
              className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
