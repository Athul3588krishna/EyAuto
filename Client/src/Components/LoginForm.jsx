import '@fortawesome/fontawesome-free/css/all.min.css';



const LoginForm = () => {
  return (
    <div className="flex justify-center items-center min-h-screen my-20 bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">What's your phone number or email?</h2>
        
        {/* Input field */}
        <input
          type="text"
          placeholder="Enter phone number or email"
          className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        {/* Continue Button */}
        <button className="w-full bg-black text-white py-3 rounded-md font-medium hover:bg-gray-800 transition">
          Continue
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Other Login Options */}
        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md mb-3 hover:bg-gray-100 transition">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google"
            className="w-5 h-5 mr-3"
          />
          Continue with Google
        </button>
        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md mb-3 hover:bg-gray-100 transition">
          <i className="fab fa-apple text-2xl mr-3"></i> {/* Include FontAwesome for Apple icon */}
          Continue with Apple
        </button>

        {/* Second Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* Find Account and QR Code */}
        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md mb-3 hover:bg-gray-100 transition">
          <i className="fas fa-search mr-3"></i> Find my account
        </button>
        <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition">
          <i className="fas fa-qrcode mr-3"></i> Log in with QR code
        </button>

        {/* Footer Text */}
        <p className="text-sm text-gray-500 text-center mt-6">
          By proceeding, you consent to get calls, WhatsApp, or SMS/RCS messages,
          including by automated means, from Uber and its affiliates to the number provided.
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
