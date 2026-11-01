import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbaaar from "../Pages/Navbaaar";
import { API_BASE_URL } from "../apiConfig";
import {
  Navigation,
  CheckCircle,
  RefreshCw,
  KeyRound,
  Play,
  Flag,
  QrCode,
  AlertCircle,
} from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const DriverDashboard = () => {
  const { lang } = useLanguage();
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [otpInputs, setOtpInputs] = useState({});
  const [otpErrors, setOtpErrors] = useState({});
  const [showQrForRide, setShowQrForRide] = useState(null);

  const [driverProfile, setDriverProfile] = useState(() => {
    const saved = localStorage.getItem("driver");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          driverName: parsed.driverName || "Suresh Kumar",
          vehicle: parsed.vehicle || "Auto",
          rating: 4.9,
          totalRides: 142,
          isOnline: true,
        };
      } catch (e) {
        console.error(e);
      }
    }
    return {
      driverName: "Suresh Kumar",
      vehicle: "Auto",
      rating: 4.9,
      totalRides: 142,
      isOnline: true,
    };
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({});

  useEffect(() => {
    setProfileFormData({ ...driverProfile });
  }, [driverProfile]);

  const fetchAvailableRides = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/api/driver/get-allAvailableRides`
      );
      if (response.data && Array.isArray(response.data.ride)) {
        setAllRides(response.data.ride);
      }
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAcceptRide = async (rideId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/driver/accept-ride`, {
        rideId,
        driverName: driverProfile.driverName,
        vehicleNumber: "KL 55 Z 1234",
      });
      fetchAvailableRides();
    } catch (error) {
      console.error("Error accepting ride:", error);
    }
  };

  const handleStartRide = async (rideId) => {
    const enteredOtp = otpInputs[rideId];
    if (!enteredOtp || enteredOtp.trim().length !== 4) {
      setOtpErrors((prev) => ({
        ...prev,
        [rideId]: lang === "ml" ? "4-അക്ക PIN നൽകുക" : "Please enter the 4-digit PIN",
      }));
      return;
    }

    try {
      setOtpErrors((prev) => ({ ...prev, [rideId]: "" }));
      await axios.post(`${API_BASE_URL}/api/driver/start-ride`, {
        rideId,
        otp: enteredOtp.trim(),
      });
      fetchAvailableRides();
    } catch (error) {
      setOtpErrors((prev) => ({
        ...prev,
        [rideId]: error.response?.data?.message || (lang === "ml" ? "PIN തെറ്റാണ്" : "Invalid PIN"),
      }));
    }
  };

  const handleCompleteRide = async (rideId) => {
    try {
      await axios.post(`${API_BASE_URL}/api/driver/complete-ride`, {
        rideId,
      });
      setShowQrForRide(rideId);
      fetchAvailableRides();
    } catch (error) {
      console.error("Error completing ride:", error);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfileChanges = () => {
    setDriverProfile(profileFormData);
    localStorage.setItem("driver", JSON.stringify(profileFormData));
    setIsEditingProfile(false);
  };

  useEffect(() => {
    fetchAvailableRides();
    const interval = setInterval(fetchAvailableRides, 6000);
    return () => clearInterval(interval);
  }, [fetchAvailableRides]);

  return (
    <div className="driver-dashboard bg-gray-50 min-h-screen">
      <Navbaaar />

      {/* Driver Profile Bar */}
      <div className="fixed top-16 left-4 z-20">
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all border border-yellow-300"
          >
            <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center text-black font-extrabold text-sm">
              {driverProfile.driverName.charAt(0)}
            </div>
            <div className="text-left">
              <span className="font-bold text-sm block leading-tight text-gray-900">
                {driverProfile.driverName}
              </span>
              <span className="text-[10px] text-gray-500 font-medium">
                {driverProfile.vehicle} &bull; {driverProfile.isOnline ? "🟢 Online" : "⚪ Offline"}
              </span>
            </div>
          </button>

          {showProfileMenu && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 z-30 p-5">
              {!isEditingProfile ? (
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-900">
                      {lang === "ml" ? "ഡ്രൈവർ പ്രൊഫൈൽ" : "Driver Partner"}
                    </h3>
                    <button
                      onClick={() => setIsEditingProfile(true)}
                      className="text-xs text-yellow-600 hover:text-yellow-700 font-bold"
                    >
                      {lang === "ml" ? "മാറ്റുക" : "Edit"}
                    </button>
                  </div>

                  <div className="space-y-2.5 text-xs text-gray-600 mb-4">
                    <div className="flex justify-between">
                      <span>{lang === "ml" ? "വാഹനം" : "Vehicle"}</span>
                      <span className="font-bold text-gray-900">
                        {driverProfile.vehicle} Rickshaw
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === "ml" ? "റേറ്റിംഗ്" : "Driver Rating"}</span>
                      <span className="font-bold text-yellow-600">
                        ★ {driverProfile.rating}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>{lang === "ml" ? "ആകെ ട്രിപ്പുകൾ" : "Total Completed"}</span>
                      <span className="font-bold text-gray-900">
                        {driverProfile.totalRides} trips
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      setDriverProfile((prev) => ({
                        ...prev,
                        isOnline: !prev.isOnline,
                      }))
                    }
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition ${
                      driverProfile.isOnline
                        ? "bg-red-100 text-red-700 hover:bg-red-200"
                        : "bg-green-100 text-green-700 hover:bg-green-200"
                    }`}
                  >
                    {driverProfile.isOnline
                      ? (lang === "ml" ? "ഓഫ്‌ലൈൻ ആവുക" : "Switch to Offline")
                      : (lang === "ml" ? "ഓൺലൈൻ ആവുക" : "Switch to Online")}
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-bold text-sm">Edit Profile</h3>
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-500">
                      Name
                    </label>
                    <input
                      type="text"
                      name="driverName"
                      value={profileFormData.driverName}
                      onChange={handleProfileChange}
                      className="w-full text-xs p-2 border rounded-lg focus:outline-none"
                    />
                  </div>
                  <button
                    onClick={saveProfileChanges}
                    className="w-full bg-yellow-400 font-bold text-xs py-2 rounded-lg mt-2"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-6xl mx-auto p-4 pt-24 pb-16">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900">
              {lang === "ml" ? "ലൈവ് റൈഡ് റിക്വസ്റ്റുകൾ (വളാഞ്ചേരി)" : "Live Ride Requests (Valanchery)"}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              EyAuto 1.0 &bull; OpenStreetMap Leaflet Engine
            </p>
          </div>
          <button
            onClick={fetchAvailableRides}
            className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 px-3 py-2 rounded-xl hover:bg-gray-50 shadow-sm font-semibold"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>{lang === "ml" ? "പുതുക്കുക" : "Refresh"}</span>
          </button>
        </div>

        {loading && allRides.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium text-sm">
              {lang === "ml" ? "റൈഡുകൾ ലോഡ് ചെയ്യുന്നു..." : "Loading available ride requests..."}
            </p>
          </div>
        ) : allRides.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
            <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto text-3xl mb-4">
              🛺
            </div>
            <div className="text-lg font-bold text-gray-800 mb-1">
              {lang === "ml" ? "പുതിയ ബുക്കിംഗുകൾ ഇല്ല" : "No Pending Ride Requests"}
            </div>
            <p className="text-gray-500 text-sm max-w-sm mx-auto">
              {lang === "ml"
                ? "നിങ്ങൾ ഇപ്പോൾ ഓൺലൈൻ ആണ്. യാത്രക്കാർ ഓട്ടോ ബുക്ക് ചെയ്യുമ്പോൾ ഇവിടെ തത്സമയം കാണാം."
                : "You are currently online. When a passenger books an auto in Valanchery, it will appear here immediately."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRides.map((ride) => {
              const isAccepted = ride.status === "Accepted";
              const isOngoing = ride.status === "Ongoing";
              const isCompleted = ride.status === "Completed";
              const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                `upi://pay?pa=eyauto@upi&pn=Driver+${driverProfile.driverName}&am=${ride.price}&cu=INR`
              )}`;

              return (
                <div
                  key={ride._id}
                  className={`bg-white rounded-3xl shadow-sm hover:shadow-md transition-all overflow-hidden border flex flex-col justify-between ${
                    isOngoing
                      ? "border-green-400 ring-2 ring-green-100"
                      : isAccepted
                      ? "border-yellow-400 ring-2 ring-yellow-100"
                      : "border-gray-200"
                  }`}
                >
                  <div>
                    {/* Header */}
                    <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-black text-gray-900">
                          ₹{ride.price}
                        </span>
                        <span className="text-xs text-gray-500 ml-2 font-bold uppercase">
                          {ride.rideType || "AUTO"}
                        </span>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-1 rounded-full border ${
                          isOngoing
                            ? "bg-green-100 text-green-800 border-green-300 animate-pulse"
                            : isAccepted
                            ? "bg-blue-100 text-blue-800 border-blue-300"
                            : isCompleted
                            ? "bg-gray-100 text-gray-700 border-gray-300"
                            : "bg-yellow-100 text-yellow-800 border-yellow-300"
                        }`}
                      >
                        {ride.status || "Pending"}
                      </span>
                    </div>

                    {/* Route Details */}
                    <div className="p-5 space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center mt-1">
                          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                          <div className="w-0.5 h-8 bg-gray-200"></div>
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        </div>
                        <div className="flex-1 space-y-2 text-xs">
                          <div>
                            <p className="font-bold text-gray-400 uppercase text-[10px]">
                              {lang === "ml" ? "പിക്കപ്പ്" : "PICKUP"}
                            </p>
                            <p className="font-semibold text-gray-800 line-clamp-2">
                              {ride.destinationFrom}
                            </p>
                          </div>
                          <div>
                            <p className="font-bold text-gray-400 uppercase text-[10px]">
                              {lang === "ml" ? "ഡ്രോപ്പ്" : "DROPOFF"}
                            </p>
                            <p className="font-semibold text-gray-800 line-clamp-2">
                              {ride.destinationTo}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <span>{ride.distance}</span>
                        <span>~{ride.time}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions / Ride Lifecycle */}
                  <div className="p-4 pt-0 space-y-3">
                    {ride.status === "Pending" && (
                      <button
                        className="w-full bg-black hover:bg-yellow-400 hover:text-black text-white py-3 px-4 rounded-2xl font-extrabold transition duration-200 text-sm shadow-md"
                        onClick={() => handleAcceptRide(ride._id)}
                      >
                        {lang === "ml" ? "റൈഡ് സ്വീകരിക്കുക" : "Accept Ride"}
                      </button>
                    )}

                    {isAccepted && (
                      <div className="space-y-2.5 bg-yellow-50 p-3.5 rounded-2xl border border-yellow-300">
                        <div className="flex items-center gap-1.5 text-yellow-900 font-bold text-xs">
                          <KeyRound size={15} />
                          <span>
                            {lang === "ml" ? "യാത്രക്കാരന്റെ 4-അക്ക PIN നൽകുക:" : "Enter Passenger 4-Digit PIN:"}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <input
                            type="text"
                            maxLength={4}
                            placeholder="PIN"
                            value={otpInputs[ride._id] || ""}
                            onChange={(e) =>
                              setOtpInputs((prev) => ({
                                ...prev,
                                [ride._id]: e.target.value.replace(/[^0-9]/g, ""),
                              }))
                            }
                            className="w-24 text-center font-mono font-black text-lg py-1.5 border-2 border-yellow-400 rounded-xl bg-white focus:outline-none"
                          />
                          <button
                            onClick={() => handleStartRide(ride._id)}
                            className="flex-1 bg-black text-yellow-400 hover:bg-yellow-500 hover:text-black font-extrabold text-xs py-2 px-3 rounded-xl flex items-center justify-center gap-1 transition"
                          >
                            <Play size={14} />
                            <span>{lang === "ml" ? "യാത്ര തുടങ്ങുക" : "Start Trip"}</span>
                          </button>
                        </div>

                        {otpErrors[ride._id] && (
                          <div className="flex items-center gap-1 text-[11px] text-red-600 font-medium">
                            <AlertCircle size={13} />
                            <span>{otpErrors[ride._id]}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {isOngoing && (
                      <div className="space-y-2 bg-green-50 p-3.5 rounded-2xl border border-green-300 text-center">
                        <p className="text-xs font-bold text-green-800 flex items-center justify-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-green-600 animate-ping"></span>
                          <span>{lang === "ml" ? "യാത്ര പുരോഗമിക്കുന്നു" : "Trip In Progress"}</span>
                        </p>
                        <button
                          onClick={() => handleCompleteRide(ride._id)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                        >
                          <Flag size={15} />
                          <span>
                            {lang === "ml"
                              ? `യാത്ര പൂർത്തിയായി • ₹${ride.price} വാങ്ങുക`
                              : `Complete Trip • Collect ₹${ride.price}`}
                          </span>
                        </button>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="bg-gray-100 p-3 rounded-2xl text-center space-y-2">
                        <div className="flex items-center justify-center gap-1 text-green-700 font-bold text-xs">
                          <CheckCircle size={14} />
                          <span>{lang === "ml" ? "യാത്ര പൂർത്തിയായി • ₹" + ride.price : "Completed • ₹" + ride.price}</span>
                        </div>
                        <button
                          onClick={() =>
                            setShowQrForRide(showQrForRide === ride._id ? null : ride._id)
                          }
                          className="w-full bg-white hover:bg-yellow-50 text-gray-800 border border-gray-300 py-1.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1"
                        >
                          <QrCode size={13} />
                          <span>{showQrForRide === ride._id ? "Hide QR" : "Show Payment QR"}</span>
                        </button>
                        {showQrForRide === ride._id && (
                          <div className="p-2 bg-white rounded-xl inline-block shadow-sm">
                            <img src={qrUrl} alt="UPI QR" className="w-32 h-32 mx-auto" />
                            <p className="text-[10px] text-gray-500 mt-1 font-bold">
                              ₹{ride.price} via GPay/PhonePe
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* OpenStreetMap Route Button */}
                    <Link
                      to={`/destination/${ride.originCoords?.lat || 10.8801},${
                        ride.originCoords?.lng || 76.0711
                      }`}
                      className="w-full bg-gray-100 hover:bg-yellow-100 text-gray-800 py-2 px-3 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1.5 border border-gray-200 transition"
                    >
                      <Navigation size={13} className="text-yellow-600" />
                      <span>{lang === "ml" ? "മാപ്പിൽ റൂട്ട് കാണുക" : "Open Leaflet Route"}</span>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;
