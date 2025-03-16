import "@fortawesome/fontawesome-free/css/all.min.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Input, Typography, Button, Spinner } from "@material-tailwind/react";

const LoginForm = () => {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    email: "",
    otp: Array(4).fill(""),
    mailConfirm: false,
    otpConfirm: false,
  });
  const inputRefs = React.useRef([]);
  // const [otp, setOtp] = React.useState(Array(6).fill(""));

  const [isLoading, setIsLoading] = useState({
    isLoadMail: false,
    isLoadOtp: false,
  });

  const handleOTPChange = (index, value) => {
    const newOtp = [...userInfo.otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setUserInfo({ ...userInfo, otp: newOtp });

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  function handleBackspace(event, index) {
    if (event.key === "Backspace" && !event.target.value && index > 0) {
      console.log(inputRefs.current[index - 1]);
      inputRefs.current[index - 1].focus();
    }
  }

  const submitEmail = async function (e) {
    setIsLoading({ ...isLoading, isLoadMail: true });
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/user/submitOTP", {
        email: userInfo.email,
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setUserInfo({ ...userInfo, mailConfirm: res.data.success });
        }
      });
    setIsLoading({ ...isLoading, isLoadMail: false });
  };

  const submitOTP = async function (e) {
    setIsLoading({ ...isLoading, isLoadOtp: true });
    e.preventDefault();
    const OTPText = userInfo.otp.join("");
    await axios
      .post("http://localhost:8000/api/user/otpVerification", {
        email: userInfo.email,
        otp: OTPText,
      })
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setUserInfo({ ...userInfo, otpConfirm: res.data.success });
          localStorage.setItem("user", JSON.stringify(res.data.data));
          navigate('/to-chooseride')
        }
      });
    setIsLoading({ ...isLoading, isLoadOtp: false });
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-3 bg-gray-100">
      {!userInfo.mailConfirm ? (
        <div className="w-full max-w-md my-20 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            {`What's your phone number or email?`}
          </h2>

          <form onSubmit={submitEmail}>
            <input
              required
              type="email"
              placeholder="Enter phone number or email"
              className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
              value={userInfo.email}
              onChange={(e) => {
                setUserInfo({
                  ...userInfo,
                  email: e.target.value,
                });
              }}
            />

            <button
              type="submit"
              className="w-full bg-black text-white text-center py-3 rounded-md font-medium hover:bg-gray-800 transition"
              disabled={isLoading.isLoadMail}
            >
              {isLoading.isLoadMail ? (
                <div className="inline-block">
                  <Spinner />
                </div>
              ) : (
                "Continue"
              )}

              {/* <Link to={"/to-chooseride"} className='px-36'>
              Continue
              </Link> */}
            </button>
          </form>
          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md mb-3 hover:bg-gray-100 transition">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxaPNaAB2vQMNU55tG5ZXY_-CWp18ubIQrfV2ngLnNkiYrNdHDvpgEhq3oTVswZ_KO4SM&usqp=CAU"
              alt="Google"
              className="w-10 h-10 mr-3"
            />
            Continue with Google Rider
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md mb-3 hover:bg-gray-100 transition">
            <i className="fab fa-apple text-2xl mr-3"></i>
            Continue with Apple
          </button>

          <div className="flex items-center my-4">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md mb-3 hover:bg-gray-100 transition">
            <i className="fas fa-search mr-3"></i> Find my account
          </button>
          <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition">
            <i className="fas fa-qrcode mr-3"></i> Log in with QR code
          </button>

          <p className="text-sm text-gray-500 text-center mt-6">
            By proceeding, you consent to get calls, WhatsApp, or SMS/RCS
            messages, including by automated means, from Uber and its affiliates
            to the number provided.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-md my-20 bg-white p-8 rounded-lg shadow-md">
          <div className="w-full max-w-sm">
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center justify-center gap-1 text-center font-medium"
            >
              Enter the 6-digit OTP sent to{" "}
              <span className="font-bold">{userInfo.email}</span>
            </Typography>
            <form onSubmit={submitOTP}>
              <div className="my-4 flex items-center justify-center gap-2 mb-4">
                {userInfo.otp.map((digit, index) => (
                  <React.Fragment key={index}>
                    <Input
                      // required
                      type="text"
                      maxLength={1}
                      className="!w-10 appearance-none !border-t-blue-gray-200 text-center !text-lg placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                      labelProps={{
                        className: "before:content-none after:content-none",
                      }}
                      containerProps={{
                        className: "!min-w-0 !w-10 !shrink-0",
                      }}
                      value={digit}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleBackspace(e, index)}
                      inputRef={(el) => (inputRefs.current[index] = el)}
                    />
                    {index === 1 && (
                      <span className="text-2xl text-slate-700">-</span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <Typography
                variant="small"
                className="text-center font-normal text-blue-gray-500 mb-2"
              >
                Did not receive the code?{" "}
                <span className="font-bold">Resend</span>
              </Typography>

              <button
                type="submit"
                className="w-full bg-black text-white text-center py-3 rounded-md font-medium hover:bg-gray-800 transition"
                disabled={isLoading.isLoadOtp}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;

// const SubmiitOTPComp = function ({ userInfo }) {

//   return (

//   );
// };
