import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Typography, Spinner } from "@material-tailwind/react";
import { API_BASE_URL } from "../../apiConfig";

const RiderRegister = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    otp: Array(4).fill(""),
    mailConfirm: false,
    otpConfirm: false,
  });
  const [devOtpHint, setDevOtpHint] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const inputRefs = useRef([]);

  const [isLoading, setIsLoading] = useState({
    isLoadMail: false,
    isLoadOtp: false,
  });

  const handleOTPChange = (index, value) => {
    const newOtp = [...userInfo.otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setUserInfo({ ...userInfo, otp: newOtp });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  function handleBackspace(event, index) {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }

  const submitEmail = async function (e) {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading((prev) => ({ ...prev, isLoadMail: true }));

    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/submitOTP`, {
        email: userInfo.email,
      });

      if (res.data?.success) {
        setUserInfo((prev) => ({ ...prev, mailConfirm: true }));
        if (res.data.devOtp) {
          setDevOtpHint(res.data.devOtp);
        }
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Failed to send verification code.");
    } finally {
      setIsLoading((prev) => ({ ...prev, isLoadMail: false }));
    }
  };

  const submitOTP = async function (e) {
    e.preventDefault();
    setErrorMsg("");
    setIsLoading((prev) => ({ ...prev, isLoadOtp: true }));

    const OTPText = userInfo.otp.join("");
    try {
      const res = await axios.post(`${API_BASE_URL}/api/user/otpVerification`, {
        email: userInfo.email,
        otp: OTPText,
      });

      if (res.status === 200 && res.data?.success) {
        const userData = res.data.data || res.data.user;
        setUserInfo((prev) => ({ ...prev, otpConfirm: true }));
        localStorage.setItem("user", JSON.stringify(userData));
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
        }
        navigate("/to-chooseride");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Invalid verification code.");
    } finally {
      setIsLoading((prev) => ({ ...prev, isLoadOtp: false }));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 bg-gray-100">
      {!userInfo.mailConfirm ? (
        <div className="w-full max-w-md my-16 bg-white p-8 rounded-2xl shadow-xl border border-yellow-200">
          <div className="text-center mb-6">
            <span className="text-3xl font-extrabold text-gray-900">
              Ey<span className="text-yellow-500">Auto</span>
            </span>
            <h2 className="text-xl font-bold text-gray-800 mt-3">
              Rider Sign in / Sign up
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Enter your email to receive an instant verification code
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-xs">
              {errorMsg}
            </div>
          )}

          <form onSubmit={submitEmail} className="space-y-4">
            <input
              required
              type="email"
              placeholder="e.g. yourname@gmail.com"
              className="w-full p-3.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />

            <button
              type="submit"
              className="w-full bg-black text-white text-center py-3.5 rounded-xl font-bold hover:bg-gray-800 transition flex items-center justify-center gap-2"
              disabled={isLoading.isLoadMail}
            >
              {isLoading.isLoadMail ? (
                <Spinner className="h-5 w-5 text-yellow-400" />
              ) : (
                "Continue with Email"
              )}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-200"></div>
            <span className="px-3 text-xs uppercase text-gray-400">or explore</span>
            <div className="flex-grow h-px bg-gray-200"></div>
          </div>

          <button
            onClick={() => navigate("/to-chooseride")}
            className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl hover:bg-gray-50 transition text-sm font-semibold text-gray-700"
          >
            Continue as Guest Rider
          </button>

          <p className="text-xs text-gray-400 text-center mt-6">
            By proceeding, you agree to EyAuto Terms of Service & Privacy Policy.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md my-16 bg-white p-8 rounded-2xl shadow-xl border border-yellow-200">
          <div className="text-center mb-6">
            <span className="text-3xl font-extrabold text-gray-900">
              Ey<span className="text-yellow-500">Auto</span>
            </span>
            <h2 className="text-xl font-bold text-gray-800 mt-2">
              Verification Code
            </h2>
            <Typography variant="small" className="text-gray-500 mt-1">
              Enter the 4-digit code sent to{" "}
              <span className="font-semibold text-black">{userInfo.email}</span>
            </Typography>
          </div>

          {devOtpHint && (
            <div className="bg-yellow-50 border border-yellow-300 p-3 rounded-xl mb-4 text-center">
              <p className="text-xs text-yellow-800 font-medium">
                Testing OTP Code: <span className="font-bold text-base tracking-widest text-black">{devOtpHint}</span>
              </p>
              <p className="text-[10px] text-yellow-600 mt-0.5">(Or enter standard test code: 1234)</p>
            </div>
          )}

          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-xs text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={submitOTP} className="space-y-6">
            <div className="flex items-center justify-center gap-3">
              {userInfo.otp.map((digit, index) => (
                <React.Fragment key={index}>
                  <Input
                    type="text"
                    maxLength={1}
                    className="!w-12 !h-12 appearance-none !border-2 !border-gray-300 text-center !text-xl font-bold focus:!border-yellow-400 rounded-xl"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    containerProps={{
                      className: "!min-w-0 !w-12 !shrink-0",
                    }}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    onKeyDown={(e) => handleBackspace(e, index)}
                    inputRef={(el) => (inputRefs.current[index] = el)}
                  />
                  {index === 1 && (
                    <span className="text-2xl text-gray-400 font-light">-</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-400 text-black py-3.5 rounded-xl font-bold hover:bg-yellow-500 transition shadow-md flex items-center justify-center gap-2"
              disabled={isLoading.isLoadOtp}
            >
              {isLoading.isLoadOtp ? (
                <Spinner className="h-5 w-5 text-black" />
              ) : (
                "Verify & Start Booking"
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                setUserInfo((prev) => ({
                  ...prev,
                  mailConfirm: false,
                  otp: Array(4).fill(""),
                }))
              }
              className="w-full text-center text-xs text-gray-500 hover:text-black font-medium"
            >
              Change Email
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default RiderRegister;
