import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen my-12 px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-yellow-200">
        <div className="text-center mb-6">
          <span className="text-3xl font-extrabold">
            Ey<span className="text-yellow-500">Auto</span>
          </span>
          <h2 className="text-xl font-bold text-gray-800 mt-2">
            What&apos;s your phone number or email?
          </h2>
        </div>

        {/* Input field */}
        <input
          type="text"
          placeholder="Enter phone number or email"
          className="w-full p-3.5 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        />

        {/* Continue Button */}
        <Link
          to="/to-rider"
          className="w-full block text-center bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-800 transition"
        >
          Continue
        </Link>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-200"></div>
          <span className="px-3 text-xs uppercase text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-200"></div>
        </div>

        {/* Google / Apple */}
        <Link
          to="/to-chooseride"
          className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-xl mb-3 hover:bg-gray-50 transition text-sm font-semibold"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google"
            className="w-5 h-5 mr-3"
          />
          Continue with Google
        </Link>

        {/* Footer Text */}
        <p className="text-xs text-gray-400 text-center mt-6">
          By proceeding, you agree to receive verification messages from EyAuto.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
