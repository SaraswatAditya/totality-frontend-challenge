import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import axios from "axios";
import { profileValidation } from "../helper/validate";
import { fetchUserData } from "../features/api/apiSlice";
import { logout } from "../store/authSlice";
import avatar from "../assets/profile.png";
import "../custom.css";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading, apiData, serverError } = useSelector((state) => state.api);
  const email = useSelector((state) => state.auth.auth.email); // Update this line to use email from auth slice
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);


  useEffect(() => {
    if (email) {
      dispatch(fetchUserData(email));
    }
  }, [email, dispatch]);

  useEffect(() => {
    if (apiData && apiData.image) {
      setPreview(apiData.image);
    }
  }, [apiData]);

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      if (file) {
        formData.append("image", file);
      }
      const token = localStorage.getItem("token");
      try {
        await axios.put("/api/updateuser", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Update Successfully");
        dispatch(fetchUserData(email)); // Fetch updated data after successful update
      } catch (error) {
        toast.error("Could Not Update!");
      }
    },
  });

  const onUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (uploadedFile) {
      reader.readAsDataURL(uploadedFile);
    }
  };

  const userLogout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
    navigate("/");
  };

  if (isLoading) return <h1 className="text-2xl font-bold">Loading...</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <div className="bg-animate min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 neon-text">
          Profile
        </h1>
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div className="profile flex justify-center py-4">
            <label htmlFor="profile">
              <img
                src={preview || avatar}
                className="w-24 h-24 rounded-full border-2 border-pink-500"
                alt="avatar"
              />
            </label>
            <input
              onChange={onUpload}
              type="file"
              id="profile"
              name="profile"
              className="hidden"
            />
          </div>

          <div className="relative">
            <input
              {...formik.getFieldProps("firstName")}
              type="text"
              placeholder="First Name"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <input
              {...formik.getFieldProps("lastName")}
              type="text"
              placeholder="Last Name"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <input
              {...formik.getFieldProps("mobile")}
              type="text"
              placeholder="Mobile No."
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <input
              {...formik.getFieldProps("email")}
              type="text"
              placeholder="Email"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
          <div className="relative">
            <input
              {...formik.getFieldProps("address")}
              type="text"
              placeholder="Address"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Update
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Want to Logout?
            <button
              onClick={userLogout}
              className="font-semibold mx-2 text-white"
            >
              Logout
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
