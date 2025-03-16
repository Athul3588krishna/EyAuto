import  { useState } from "react";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    vehicleModel: "",
    vehicleNumber: "",
    license: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration data:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-center text-gray-900">
           Driver Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-gray-50"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-gray-50"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-gray-50"
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* Vehicle Model */}
          <div>
            <label className="block text-gray-700">Vehicle Model</label>
            <input
              type="text"
              name="vehicleModel"
              value={formData.vehicleModel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-gray-50"
              placeholder="Enter vehicle model"
              required
            />
          </div>

          {/* Vehicle Number */}
          <div>
            <label className="block text-gray-700">Vehicle Number</label>
            <input
              type="text"
              name="vehicleNumber"
              value={formData.vehicleNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-gray-50"
              placeholder="Enter vehicle number"
              required
            />
          </div>

          {/* License Upload */}
          <div>
            <label className="block text-gray-700">Upload Driver License</label>
            <input
              type="file"
              name="license"
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-yellow transition duration-300"
          >
            Register
          </button>
        </form>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <a href="#" className="text-black font-semibold hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
