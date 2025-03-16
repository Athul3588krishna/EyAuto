import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DriverRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    driverName: "",
    drivingLicense: "",
    adhaarCard: "",
    panCard: "",
    vehicle: ""
  });
  
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLocation({ lat, lon });
          console.log("Form Data:", formData);
          setIsLoading(true);
          setErrorMSG("");
          
          try {
            const res = await axios.post("http://localhost:8000/api/driver/driver-register", {
              formData,
              position
            });
            
            if (res.status === 200) {
              navigate("/to-dashboard");
            }
          } catch (error) {
            setErrorMSG(error.response?.data?.message || "Registration failed. Please try again.");
          } finally {
            setIsLoading(false);
          }
        },
        (error) => {
          setIsLoading(false);
          setErrorMSG("Could not access your location. Please enable location services.");
        }
      );
    } else {
      setErrorMSG("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <div>
            {/* Header with logo */}
            <div className="bg-black text-white p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <svg className="h-10 w-10 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                  <line x1="9" y1="9" x2="9.01" y2="9" />
                  <line x1="15" y1="9" x2="15.01" y2="9" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold">Welcome to Ey Auto</h1>
              <p className="text-yellow-300 mt-1 text-sm">
                Your journey as a driver begins here
              </p>
            </div>

            {/* Main form */}
            <div className="p-6">
              <div className="space-y-2 mb-6">
                <h2 className="text-lg font-medium text-gray-900">Driver Registration</h2>
                <p className="text-sm text-gray-500">
                  Please complete the form below with your details
                </p>
              </div>

              {errorMSG && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
                  <span className="font-medium">Error:</span> {errorMSG}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Driver Name */}
                <div>
                  <label htmlFor="driverName" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="driverName"
                      name="driverName"
                      value={formData.driverName}
                      onChange={handleChange}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label htmlFor="vehicle" className="block text-sm font-medium text-gray-700">
                    Vehicle Type
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    <select
                      id="vehicle"
                      name="vehicle"
                      value={formData.vehicle}
                      onChange={handleChange}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      required
                    >
                      <option value="">Select a vehicle</option>
                      {/* <option value="Moto">Moto</option> */}
                      <option value="Auto">Auto</option>
                      {/* <option value="Car">Car</option> */}
                    </select>
                  </div>
                </div>

                {/* Driving License */}
                <div>
                  <label htmlFor="drivingLicense" className="block text-sm font-medium text-gray-700">
                    Driving License Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="drivingLicense"
                      name="drivingLicense"
                      value={formData.drivingLicense}
                      onChange={handleChange}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      placeholder="DL12345678"
                      required
                    />
                  </div>
                </div>

                {/* Aadhaar Card */}
                <div>
                  <label htmlFor="adhaarCard" className="block text-sm font-medium text-gray-700">
                    Enter your vehicle Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="adhaarCard"
                      name="adhaarCard"
                      value={formData.adhaarCard}
                      onChange={handleChange}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      placeholder="KL XX 1234"
                      required
                    />
                  </div>
                </div>

                {/* PAN Card */}
                <div>
                  <label htmlFor="panCard" className="block text-sm font-medium text-gray-700">
                    Enter your license Number
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="panCard"
                      name="panCard"
                      value={formData.panCard}
                      onChange={handleChange}
                      className="pl-10 block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                      placeholder="ABCDE1234F"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-black hover:bg-yellow-500 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition-all duration-300"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <svg className="h-5 w-5 text-yellow-400 group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Register as Driver
                  </button>
                </div>
              </form>
              
              <div className="mt-6 text-center text-sm text-gray-500">
                <p>By registering, you agree to our Terms of Service and Privacy Policy</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverRegister;