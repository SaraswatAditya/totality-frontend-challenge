import React, { useState, useEffect } from "react";
import "../custom.css";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { fetchUserData } from "../features/api/apiSlice";
import { setActive, setEmail } from "../store/authSlice";
import { verifyPassword } from "../helper/helper";
import toast, { Toaster } from "react-hot-toast";
import { emailValidate } from "../helper/validate";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const email = useSelector((state) => state.auth.auth.email);
  // const { isLoading,  serverError } = useSelector((state) => state.api);

  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  // useEffect(() => {
  //   if (email) {
  //     dispatch(fetchUserData(email));

  //     console.log("API 1",email);
  //   }
  // }, [email, dispatch]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: emailValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      setShowRecovery(true);
      // console.log(values);
      dispatch(setEmail(values.email));
      let loginPromise = verifyPassword({
        email: values.email,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Checking...",
        success: <b>Login Successfully</b>,
        error: <b>Password Not Match</b>,
      });
      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);
        dispatch(setActive(true));
        navigate("/");
      });
    },
  });

  const recoveryRedirect = () => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        dispatch(setEmail(formik.values.email));
        navigate("/recovery");
      } else {
        toast.error("Please enter a valid email before proceeding.");
      }
    });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <div className="bg-animate min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 neon-text">
          Welcome
        </h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              value={formik.values.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
            />
            <FaEnvelope className="absolute right-3 top-3 text-pink-500" />
          </div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              value={formik.values.password}
              onChange={(e) => formik.setFieldValue("password", e.target.value)}
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
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Sign In
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            New User?
            <Link to="/register" className="font-semibold mx-2 text-white">
              Register
            </Link>
          </p>
          {showRecovery && (
            <div className="text-gray-400 my-1">
              Forgot password?
              <div
                className="font-semibold text-white cursor-pointer"
                onClick={recoveryRedirect}
              >
                Reset
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
