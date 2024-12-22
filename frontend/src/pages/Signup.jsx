import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isSigningIn, signup } = useAuthStore();
  const [formData, setFormData] = useState({
    name: {
      firstName: "",
      lastName: "",
    },
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = (formValue) => {
    if (formValue.firstName === "") {
      return setError("First Name is required");
    }
    if (formValue.lastName === "") {
      return setError("Last Name is required");
    }
    if (formValue.email === "") {
      return setError("Email is required");
    }
    if (formValue.password === "") {
      return setError("Password is required");
    }
    return setError("");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm(formData);
    if (error) {
      toast.error(error);
      return;
    }

    const result = await signup(formData);
    if (result?.error && result?.error.success === false) {
      console.log(result.error.errorSources);

      result?.error?.errorSources?.forEach((error) => {
        return toast.error(error.message);
      });
    }
    console.log(result.success, "result");
    if (result?.data?.success) {
      toast.success(result?.data?.message);
    }

    console.log(result, "result");
    navigate("/login");

    setFormData({ firstName: "", lastName: "", email: "", password: "" });
  };
  return (
    <div className="min-h-screen grid grid-cols-2  justify-center ">
      {/* Left Side */}
      <div className="flex flex-col  justify-center items-center p-6 sm:p-12 my-12">
        <div className="w-full flex flex-col justify-center items-center max-w-md  space-y-4 mb-8">
          <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors ">
            <MessageSquare className="size-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mt-2">Create Account</h1>
          <p className="text-base-content/60 ">
            Get started with your free account
          </p>
        </div>
        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex gap-2 items-center justify-center">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">First Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.name.firstName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: { ...prev.name, firstName: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Last Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="John Doe"
                  value={formData.name.lastName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      name: { ...prev.name, lastName: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="size-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className={`input input-bordered w-full pl-10`}
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="size-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className={`input input-bordered w-full pl-10`}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff
                    onClick={() => handleShowPassword()}
                    className="size-5 text-base-content/40"
                  />
                ) : (
                  <Eye className="size-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSigningIn}
          >
            {isSigningIn ? (
              <>
                <Loader2 className="size-5 animate-spin" />
                Loading...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>
        <p className="mt-4">
          Already have an account?{" "}
          <Link
            className="hover:border-b border-gray-300 text-blue-300 "
            to="/login"
          >
            Login
          </Link>
        </p>
      </div>
      <AuthImagePattern
        title="Create Account"
        subtitle="Join our community and connect with friends and family"
      />
    </div>
  );
};

export default Signup;
