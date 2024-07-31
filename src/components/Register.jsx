import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { registerValidation } from "../helper/validate";
import * as Yup from "yup";
import "../custom.css";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(4, "Password must be at least 4 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const {
          data: { msg },
          status,
        } = await axios.post(`/api/register`, values);

        toast.success("Registered Successfully!");
        if (status === 201) {
          try {
            await axios.post("/api/registerMail", {
              userEmail: values.email,
              text: msg,
            });
          } catch (error) {
            console.error("Error sending mail:", error);
          }
        }
        navigate("/login");
      } catch (error) {
        toast.error("Could not Register.");
        toast.error("Email Already Exists");
        console.error(
          "Registration Error:",
          error.response?.data || error.message
        );
      }
    },
  });

  return (
    <div className="bg-animate min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 neon-text">
          Join Us!!
        </h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500">Invalid Email</div>
            ) : null}
            <FaEnvelope className="absolute right-3 top-3 text-pink-500" />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
              placeholder="Confirm Password"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              {...formik.getFieldProps("confirmPassword")}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="text-red-500">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
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
            Sign Up
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?
            <Link to="/login" className="font-semibold mx-2 text-white">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
