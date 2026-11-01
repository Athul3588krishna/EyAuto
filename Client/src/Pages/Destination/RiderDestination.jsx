import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { API_BASE_URL } from "../../apiConfig";
import { MapPin, ArrowRight, Loader2, Navigation } from "lucide-react";

function RiderDestination() {
  const navigate = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [activeInput, setActiveInput] = useState("from");
  const [addressList, setAddressList] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const debounceTimer = useRef(null);

  const fetchSuggestions = (query, inputType) => {
    if (!query || query.trim().length < 2) {
      setAddressList([]);
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      try {
        setIsSearching(true);
        const response = await axios.post(`${API_BASE_URL}/api/maps/get-sugession`, {
          address: query,
        });
        setActiveInput(inputType);
        setAddressList(response.data || []);
      } catch (error) {
        console.error("Suggestion error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 350);
  };

  const handleAddressClick = (address) => {
    if (activeInput === "from") {
      setFrom(address.description);
    } else {
      setTo(address.description);
    }
    setAddressList([]);
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(4);
          const lng = pos.coords.longitude.toFixed(4);
          setFrom(`Current Location (${lat}, ${lng})`);
        },
        () => {
          setFrom("Valanchery Bus Stand, Kerala");
        }
      );
    } else {
      setFrom("Valanchery Bus Stand, Kerala");
    }
  };

  const handleSubmit = async () => {
    setErrorMsg("");
    if (!from || !to) {
      setErrorMsg("Please enter both pickup (From) and destination (To) locations.");
      return;
    }

    try {
      setIsCalculating(true);
      const response = await axios.post(`${API_BASE_URL}/api/maps/calculate-distance`, {
        origin: from,
        destination: to,
      });

      const stats = {
        ...response.data,
        destination: { from, to },
        distination: { from, to }, // backward compatibility
      };

      navigate("/to-ride", { state: stats });
    } catch (error) {
      console.error("Error calculating trip:", error);
      setErrorMsg(error.response?.data?.error || "Failed to calculate route. Please try again.");
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-yellow-200">
        {/* Header */}
        <div className="bg-black text-white p-6">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-yellow-400">🛺 EyAuto</span> Trip Planner
          </h1>
          <p className="text-yellow-200 text-sm mt-1">
            Fast, reliable auto rickshaws powered by OpenStreetMap
          </p>
        </div>

        {/* Input Form */}
        <div className="p-6 space-y-4">
          {errorMsg && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {errorMsg}
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-700">
                Pickup Location (From)
              </label>
              <button
                type="button"
                onClick={handleUseCurrentLocation}
                className="text-xs text-yellow-600 hover:text-yellow-700 font-semibold flex items-center gap-1"
              >
                <Navigation size={12} /> Use GPS Location
              </button>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-green-600">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                placeholder="e.g. Valanchery Bus Stand, Kottakkal..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                value={from}
                onChange={(e) => {
                  setFrom(e.target.value);
                  fetchSuggestions(e.target.value, "from");
                }}
                onFocus={() => setActiveInput("from")}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
              Destination Location (To)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-red-600">
                <MapPin size={18} />
              </div>
              <input
                type="text"
                placeholder="e.g. Kuttippuram Station, Tirur..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                value={to}
                onChange={(e) => {
                  setTo(e.target.value);
                  fetchSuggestions(e.target.value, "to");
                }}
                onFocus={() => setActiveInput("to")}
              />
            </div>
          </div>

          <button
            type="button"
            disabled={isCalculating}
            onClick={handleSubmit}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3.5 px-4 rounded-xl shadow-md transition duration-200 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
          >
            {isCalculating ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                <span>Calculating Route & Fare...</span>
              </>
            ) : (
              <>
                <span>Find Auto & Rides</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>

        {/* Search Suggestions */}
        {isSearching && (
          <div className="px-6 py-2 text-sm text-gray-500 flex items-center gap-2">
            <Loader2 className="animate-spin" size={16} />
            <span>Searching OpenStreetMap places...</span>
          </div>
        )}

        {addressList.length > 0 && (
          <div className="border-t border-gray-100 p-4 bg-gray-50 max-h-72 overflow-y-auto">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Select Location ({activeInput === "from" ? "Pickup" : "Destination"})
            </p>
            <div className="space-y-2">
              {addressList.map((item, idx) => (
                <div
                  key={item.place_id || idx}
                  className="flex items-start gap-3 p-3 bg-white border border-gray-200 rounded-xl cursor-pointer hover:border-yellow-400 hover:bg-yellow-50 transition"
                  onClick={() => handleAddressClick(item)}
                >
                  <MapPin className="text-yellow-600 flex-shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-gray-800 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiderDestination;
