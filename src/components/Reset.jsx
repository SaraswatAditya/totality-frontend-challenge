import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "../helper/validate";
import { resetPassword } from "../helper/helper";
import { useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Reset = () => {
  const email = useSelector((state) => state.auth.auth.email); // Adjusted to use email
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirm_pwd: "",
    },
    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const resetPromise = resetPassword({ email, password: values.password });

      toast.promise(resetPromise, {
        loading: "Updating...",
        success: <b>Reset Successfully!</b>,
        error: <b>Could not Reset!</b>,
      });

      resetPromise.then(() => {
        navigate("/");
      });
    },
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <div className="bg-animate min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 neon-text">
          Reset Password
        </h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              {...formik.getFieldProps("password")}
            />
            {showPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-3 text-pink-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-3 text-pink-500 cursor-pointer"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat Password"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              {...formik.getFieldProps("confirm_pwd")}
            />
            {showConfirmPassword ? (
              <FaEyeSlash
                className="absolute right-3 top-3 text-pink-500 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              />
            ) : (
              <FaEye
                className="absolute right-3 top-3 text-pink-500 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Reset Password
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            <Link to="/" className="font-semibold text-white">
              Go to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reset;
