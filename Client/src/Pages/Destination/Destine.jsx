import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../apiConfig";

function Destine() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [activeInput, setActiveInput] = useState("");
  const [addressList, setAddressList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddressClick = (address) => {
    if (activeInput === "from") {
      setFrom(address.description);
    } else if (activeInput === "to") {
      setTo(address.description);
    }
    setAddressList([]);
  };

  const handleInputChange = async (value, inputType) => {
    if (inputType === "from") {
      setFrom(value);
      setActiveInput("from");
    } else {
      setTo(value);
      setActiveInput("to");
    }

    if (value.trim().length > 2) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${API_BASE_URL}/api/maps/get-sugession`,
          { address: value }
        );
        setAddressList(response.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setAddressList([]);
    }
  };

  const handleSubmit = async () => {
    if (!from || !to) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/maps/calculate-distance`,
        {
          origin: from,
          destination: to,
        }
      );
      const tripData = {
        ...response.data,
        destination: { from, to },
        distination: { from, to },
      };
      navigate("/to-ride", { state: tripData });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-2xl my-8">
      <div className="md:flex">
        <div className="p-8 w-full">
          <div className="uppercase tracking-wide text-lg text-black font-semibold mb-6">
            Where would you like to go in Valanchery?
          </div>

          {/* Input Fields */}
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Pickup Location (From)"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                value={from}
                onChange={(e) => handleInputChange(e.target.value, "from")}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Dropoff Destination (To)"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                value={to}
                onChange={(e) => handleInputChange(e.target.value, "to")}
              />
            </div>
          </div>

          {/* Find Trip Button */}
          <button
            onClick={handleSubmit}
            className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50"
            disabled={!from || !to || isLoading}
          >
            {isLoading ? "Calculating Route..." : "Find Trip"}
          </button>

          {/* Address Suggestions List */}
          {addressList.length > 0 && (
            <div className="mt-4 bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
              <div className="text-xs text-gray-500 px-4 py-2 border-b">
                Suggested locations (OpenStreetMap)
              </div>
              <div className="max-h-60 overflow-y-auto">
                {addressList.map((address) => (
                  <div
                    key={address.place_id}
                    className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition duration-150 ease-in-out"
                    onClick={() => handleAddressClick(address)}
                  >
                    <div className="ml-3 text-sm text-gray-700 truncate">
                      {address.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Destine;
