import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { generateOTP, verifyOTP } from "../helper/helper";
import "../custom.css";

function Recovery() {
  const email = useSelector((state) => state.auth.auth.email);
  const [OTP, setOTP] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
    //   console.log("email:", email);
      sendOTP();
    }
  }, [email]);

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setResendDisabled(false);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const sendOTP = async () => {
    if (email) {
      try {
        const OTP = await generateOTP(email);
        if (OTP) {
            console.log("email:", email);
          toast.success("OTP has been sent to your email");
        } else {
          toast.error("Problem while generating OTP!");
        }
      } catch (error) {
        toast.error("Error while sending OTP!");
      }
    } else {
      toast.error("Email is not available!");
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ email, code: OTP });
      if (status === 201) {
        toast.success("Verified Successfully");
        navigate("/reset", { replace: true });
      }
    } catch (error) {
      toast.error("Wrong OTP! Check email again!");
    }
  };

  const resendOTP = () => {
    if (!resendDisabled) {
      sendOTP();
      setResendDisabled(true);
      setTimer(10);
    }
  };

  return (
    <div className="bg-animate min-h-screen flex items-center justify-center p-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="bg-black bg-opacity-80 p-8 rounded-3xl shadow-2xl transform hover:scale-105 transition-all duration-500 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-center mb-8 neon-text">
          Recovery
        </h1>
        <div className="text-center text-gray-400 mb-6">
          <p>Enter the 4-digit OTP sent to your email address.</p>
        </div>
        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="relative">
            <input
              onChange={(e) => setOTP(e.target.value)}
              type="text"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300"
              placeholder="Enter OTP"
              value={OTP}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
          >
            Recover
          </button>
        </form>
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Can't get OTP?{" "}
            <button
              onClick={resendOTP}
              className="font-semibold mx-2 text-white"
              disabled={resendDisabled}
            >
              Resend {resendDisabled && `(${timer}s)`}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Recovery;
