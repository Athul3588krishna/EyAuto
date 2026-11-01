import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";

function DriverRegister() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    driverName: "",
    drivingLicense: "",
    adhaarCard: "",
    panCard: "",
    vehicle: "Auto",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMSG, setErrorMSG] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const registerDriverWithPosition = async (position) => {
    try {
      setIsLoading(true);
      setErrorMSG("");

      const res = await axios.post(`${API_BASE_URL}/api/driver/driver-register`, {
        formData,
        position,
      });

      if (res.status === 200 && res.data.success) {
        localStorage.setItem("driver", JSON.stringify(res.data.driver));
        navigate("/to-dashboard");
      }
    } catch (error) {
      setErrorMSG(
        error.response?.data?.message || "Registration failed. Please check details and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          registerDriverWithPosition(position);
        },
        () => {
          // Fallback to default Valanchery coords
          registerDriverWithPosition({
            coords: { latitude: 10.8801, longitude: 76.0711 },
          });
        }
      );
    } else {
      registerDriverWithPosition({
        coords: { latitude: 10.8801, longitude: 76.0711 },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-yellow-200">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-96 p-8">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-yellow-500 mb-4"></div>
            <p className="text-gray-600 font-medium">Registering your driver profile...</p>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="bg-black text-white p-6 text-center">
              <span className="text-3xl font-extrabold text-white">
                Ey<span className="text-yellow-400">Auto</span>
              </span>
              <h1 className="text-xl font-bold mt-2">Driver Partner Registration</h1>
              <p className="text-yellow-300 text-xs mt-1">
                Drive your auto rickshaw with pride in Valanchery
              </p>
            </div>

            {/* Main form */}
            <div className="p-6">
              {errorMSG && (
                <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm border border-red-200">
                  <span className="font-semibold">Notice:</span> {errorMSG}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Driver Name */}
                <div>
                  <label htmlFor="driverName" className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="driverName"
                    name="driverName"
                    value={formData.driverName}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm"
                    placeholder="e.g. Suresh Kumar"
                    required
                  />
                </div>

                {/* Vehicle Selection */}
                <div>
                  <label htmlFor="vehicle" className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Vehicle Type
                  </label>
                  <select
                    id="vehicle"
                    name="vehicle"
                    value={formData.vehicle}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm"
                    required
                  >
                    <option value="Auto">🛺 Auto Rickshaw</option>
                    <option value="Moto">🏍️ Two Wheeler / Bike</option>
                    <option value="Car">🚗 Taxi / Cab</option>
                  </select>
                </div>

                {/* Driving License */}
                <div>
                  <label htmlFor="drivingLicense" className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Driving License Number
                  </label>
                  <input
                    type="text"
                    id="drivingLicense"
                    name="drivingLicense"
                    value={formData.drivingLicense}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm"
                    placeholder="KL55 20200001234"
                    required
                  />
                </div>

                {/* Vehicle Number */}
                <div>
                  <label htmlFor="adhaarCard" className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Vehicle Registration Number
                  </label>
                  <input
                    type="text"
                    id="adhaarCard"
                    name="adhaarCard"
                    value={formData.adhaarCard}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm"
                    placeholder="KL 55 Z 1234"
                  />
                </div>

                {/* Badge / Document Number */}
                <div>
                  <label htmlFor="panCard" className="block text-xs font-bold uppercase text-gray-700 mb-1">
                    Driver Badge / Aadhaar / PAN
                  </label>
                  <input
                    type="text"
                    id="panCard"
                    name="panCard"
                    value={formData.panCard}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none text-sm"
                    placeholder="1234 5678 9012"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-xl shadow-md transition duration-200"
                  >
                    Complete Registration & Open Dashboard
                  </button>
                </div>
              </form>

              <div className="mt-4 text-center">
                <button
                  type="button"
                  onClick={() => navigate("/to-dashboard")}
                  className="text-xs text-gray-500 hover:text-black font-semibold"
                >
                  Already registered? Go to Driver Dashboard →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DriverRegister;
