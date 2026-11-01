import { useEffect, useState } from "react";
import {
  Check,
  Bell,
  ArrowLeft,
  Navigation,
  ShieldCheck,
  Share2,
  QrCode,
  CheckCircle,
  PhoneCall,
  KeyRound,
  Banknote,
} from "lucide-react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import { useLanguage } from "../../context/LanguageContext";

const Chooseride = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lang } = useLanguage();

  // Safe fallback if state is not provided
  const stateData = location.state || {
    distance: "3.2 km",
    time: "10 mins",
    price: { auto: 45, moto: 30, car: 70 },
    destination: {
      from: "Valanchery Town",
      to: "Kuttippuram Station",
    },
    originCoords: { lat: 10.8801, lng: 76.0711 },
    destinationCoords: { lat: 10.8442, lng: 76.0276 },
  };

  const tripDetails = {
    distance: stateData.distance || "3.2 km",
    time: stateData.time || "10 mins",
    price: stateData.price || { auto: 45, moto: 30, car: 70 },
    destination: stateData.destination || stateData.distination || {
      from: "Valanchery",
      to: "Nearby Destination",
    },
    originCoords: stateData.originCoords || { lat: 10.8801, lng: 76.0711 },
    destinationCoords: stateData.destinationCoords || { lat: 10.8442, lng: 76.0276 },
  };

  const [selectedRide, setSelectedRide] = useState("auto");
  const [showNotification, setShowNotification] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRequestConfirmed, setIsRequestConfirmed] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Pending");
  const [riderID, setRiderID] = useState("");
  const [rideOtp, setRideOtp] = useState("4821");
  const [driverInfo, setDriverInfo] = useState({
    name: "Suresh Kumar",
    phone: "9847123456",
    vehicleNumber: "KL 55 Z 1234",
  });
  const [isPaid, setIsPaid] = useState(false);

  const handleConfirmRide = async () => {
    if (!selectedRide) return;
    try {
      setIsConfirming(true);
      const res = await axios.post(`${API_BASE_URL}/api/rider/submit-ride`, {
        status: "Pending",
        destination: tripDetails.destination,
        originCoords: tripDetails.originCoords,
        destinationCoords: tripDetails.destinationCoords,
        rideType: selectedRide,
        price: tripDetails.price[selectedRide] || 50,
        distance: tripDetails.distance,
        time: tripDetails.time,
      });

      const newRideId = res.data.rideId;
      setRiderID(newRideId);
      if (res.data.rideOtp) setRideOtp(res.data.rideOtp);
      setIsRequestConfirmed(true);
      setShowNotification(true);
      fetchRideStatus(newRideId);
      setTimeout(() => setShowNotification(false), 5000);
    } catch (error) {
      console.error("Confirm ride error:", error);
    } finally {
      setIsConfirming(false);
    }
  };

  const fetchRideStatus = async (rideId) => {
    if (!rideId) return;
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/rider/check-ride-status?rideId=${rideId}`
      );
      if (res.data && res.data.rideStats) {
        setCurrentStatus(res.data.rideStats);
        if (res.data.rideOtp) setRideOtp(res.data.rideOtp);
        if (res.data.driverName) {
          setDriverInfo({
            name: res.data.driverName,
            phone: res.data.driverPhone || "9847123456",
            vehicleNumber: res.data.vehicleNumber || "KL 55 Z 1234",
          });
        }
      }
    } catch (err) {
      console.warn("Poll ride status error:", err.message);
    }
  };

  useEffect(() => {
    if (isRequestConfirmed && riderID) {
      fetchRideStatus(riderID);
      const interval = setInterval(() => {
        fetchRideStatus(riderID);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isRequestConfirmed, riderID]);

  // Share Live Trip via WhatsApp
  const handleShareWhatsApp = () => {
    const text = `🛺 *EyAuto Live Trip Update (Valanchery)*\n\n` +
      `📍 *From:* ${tripDetails.destination.from}\n` +
      `🏁 *To:* ${tripDetails.destination.to}\n` +
      `👤 *Driver:* ${driverInfo.name} (${driverInfo.vehicleNumber})\n` +
      `💰 *Fare:* ₹${tripDetails.price[selectedRide] || 50}\n` +
      `🔑 *Ride PIN:* ${rideOtp}\n` +
      `🗺️ *Live Leaflet Track:* ${window.location.origin}/destination/${tripDetails.originCoords.lat},${tripDetails.originCoords.lng}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const currentFare = tripDetails.price[selectedRide] || 50;
  // Standard UPI URI format
  const upiUri = `upi://pay?pa=eyauto@upi&pn=EyAuto+Valanchery&am=${currentFare}&cu=INR&tn=EyAuto+Trip+Payment`;
  const upiQrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiUri)}`;

  const rideOptions = [
    {
      id: "auto",
      name: lang === "ml" ? "ഓട്ടോ റിക്ഷ" : "EyAuto Rickshaw",
      icon: "🛺",
      desc: lang === "ml" ? "വേഗത്തിൽ, കുറഞ്ഞ നിരക്കിൽ" : "Fast & affordable local auto",
      price: tripDetails.price.auto || 45,
      capacity: "3 seats",
    },
    {
      id: "moto",
      name: lang === "ml" ? "ടു വീലർ / ബൈക്ക്" : "EyAuto Bike",
      icon: "🏍️",
      desc: lang === "ml" ? "ട്രാഫിക്കില്ലാതെ സിംഗിൾ റൈഡ്" : "Single rider, beat traffic",
      price: tripDetails.price.moto || 30,
      capacity: "1 seat",
    },
    {
      id: "car",
      name: lang === "ml" ? "ടാക്സി / കാബ്" : "EyAuto Cab",
      icon: "🚗",
      desc: lang === "ml" ? "കുടുംബത്തോടൊപ്പം യാത്രയ്ക്ക്" : "Comfortable hatchback/sedan",
      price: tripDetails.price.car || 70,
      capacity: "4 seats",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-md mx-auto relative">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate("/to-chooseride")}
            className="flex items-center gap-1.5 text-gray-700 hover:text-black font-medium text-sm"
          >
            <ArrowLeft size={16} />
            <span>{lang === "ml" ? "റൂട്ട് മാറ്റുക" : "Change Route"}</span>
          </button>
          <span className="text-[11px] bg-yellow-100 text-yellow-800 font-bold px-3 py-1 rounded-full border border-yellow-300">
            OpenStreetMap Leaflet
          </span>
        </div>

        {/* Floating Notification */}
        {showNotification && (
          <div className="bg-green-600 text-white px-4 py-3 rounded-2xl mb-4 shadow-xl flex items-center justify-between animate-bounce">
            <div className="flex items-center gap-2">
              <Bell size={18} />
              <div>
                <p className="font-bold text-sm">
                  {lang === "ml" ? "റൈഡ് റിക്വസ്റ്റ് അയച്ചു!" : "Ride Request Sent!"}
                </p>
                <p className="text-xs text-green-100">
                  {lang === "ml" ? "വളാഞ്ചേരിയിലെ ഓട്ടോ ഡ്രൈവർമാരെ ബന്ധപ്പെടുന്നു" : "Connecting you with nearby auto drivers"}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Route Summary Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-200 mb-4">
          <div className="flex items-center justify-between mb-3 border-b pb-2">
            <div>
              <p className="text-[10px] text-gray-400 font-bold uppercase">
                {lang === "ml" ? "കണക്കാക്കിയ ദൂരം" : "Estimated Trip"}
              </p>
              <p className="text-sm font-bold text-gray-800">
                {tripDetails.distance} &bull; ~{tripDetails.time}
              </p>
            </div>
            <Link
              to={`/destination/${tripDetails.originCoords.lat},${tripDetails.originCoords.lng}`}
              className="text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-800 font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 border border-yellow-300"
            >
              <Navigation size={13} className="text-yellow-600" />
              <span>{lang === "ml" ? "മാപ്പിൽ കാണുക" : "View Map"}</span>
            </Link>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-start gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-green-500 mt-1 flex-shrink-0"></div>
              <p className="text-gray-700">
                <span className="font-bold">{lang === "ml" ? "പിക്കപ്പ്:" : "From:"}</span> {tripDetails.destination.from}
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
              <p className="text-gray-700">
                <span className="font-bold">{lang === "ml" ? "ഡ്രോപ്പ്:" : "To:"}</span> {tripDetails.destination.to}
              </p>
            </div>
          </div>
        </div>

        {!isRequestConfirmed ? (
          <div className="space-y-3">
            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
              {lang === "ml" ? "വാഹനം തിരഞ്ഞെടുക്കുക" : "Choose Vehicle Option"}
            </h2>

            {rideOptions.map((opt) => (
              <div
                key={opt.id}
                onClick={() => setSelectedRide(opt.id)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  selectedRide === opt.id
                    ? "border-yellow-400 bg-yellow-50 shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {opt.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{opt.name}</h3>
                      <span className="text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded">
                        {opt.capacity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </div>
                </div>

                <div className="text-right flex items-center gap-3">
                  <span className="text-lg font-extrabold text-gray-900">₹{opt.price}</span>
                  {selectedRide === opt.id && (
                    <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center">
                      <Check size={14} className="text-black font-bold" />
                    </div>
                  )}
                </div>
              </div>
            ))}

            <button
              onClick={handleConfirmRide}
              disabled={isConfirming}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold py-4 rounded-2xl shadow-lg transition duration-200 mt-4 disabled:opacity-50 text-base"
            >
              {isConfirming
                ? (lang === "ml" ? "ബുക്ക് ചെയ്യുന്നു..." : "Submitting Booking...")
                : (lang === "ml"
                    ? `${selectedRide.toUpperCase()} ബുക്ക് ചെയ്യുക • ₹${currentFare}`
                    : `Book ${selectedRide.toUpperCase()} • ₹${currentFare}`)}
            </button>
          </div>
        ) : (
          /* LIVE BOOKING & STATUS SCREEN */
          <div className="bg-white rounded-3xl shadow-xl border border-yellow-200 p-6 text-center space-y-5">
            {/* 1. RIDE START OTP CARD */}
            {currentStatus !== "Completed" && (
              <div className="bg-gradient-to-r from-yellow-100 to-amber-100 border-2 border-yellow-400 p-4 rounded-2xl shadow-sm text-center">
                <div className="flex items-center justify-center gap-1.5 text-yellow-900 mb-1">
                  <KeyRound size={16} />
                  <span className="text-xs uppercase font-extrabold tracking-wider">
                    {lang === "ml" ? "റൈഡ് സ്റ്റാർട്ട് PIN (OTP)" : "Ride Start PIN / OTP"}
                  </span>
                </div>
                <div className="text-4xl font-black text-black tracking-widest my-1 font-mono">
                  {rideOtp}
                </div>
                <p className="text-[11px] text-yellow-800">
                  {lang === "ml"
                    ? "ഓട്ടോ വരുമ്പോൾ ഡ്രൈവർക്ക് ഈ 4-അക്ക കോഡ് പറഞ്ഞു കൊടുക്കുക"
                    : "Share this 4-digit code with your driver to start trip"}
                </p>
              </div>
            )}

            {/* Status Heading */}
            <div>
              <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mx-auto text-3xl mb-2 animate-bounce">
                🛺
              </div>
              <h3 className="text-xl font-extrabold text-gray-900">
                {currentStatus === "Accepted"
                  ? (lang === "ml" ? "🎉 ഡ്രൈവർ വരുന്നുണ്ട്!" : "🎉 Driver Assigned!")
                  : currentStatus === "Ongoing"
                  ? (lang === "ml" ? "🟢 യാത്ര പുരോഗമിക്കുന്നു!" : "🟢 Trip in Progress!")
                  : currentStatus === "Completed"
                  ? (lang === "ml" ? "✅ യാത്ര വിജയകരമായി പൂർത്തിയായി!" : "✅ Trip Completed!")
                  : (lang === "ml" ? "ഡ്രൈവറെ തിരയുന്നു..." : "Searching for Drivers...")}
              </h3>
              <p className="text-xs text-gray-500 mt-1">
                {currentStatus === "Accepted"
                  ? (lang === "ml" ? `${driverInfo.name} ഓട്ടോയുമായി പിക്കപ്പിലേക്ക് പുറപ്പെട്ടു.` : `${driverInfo.name} is on the way to pick you up.`)
                  : currentStatus === "Ongoing"
                  ? (lang === "ml" ? "സുരക്ഷിത യാത്ര ആശംസിക്കുന്നു!" : "Enjoy your safe ride through Valanchery!")
                  : currentStatus === "Completed"
                  ? (lang === "ml" ? "EyAuto ഉപയോഗിച്ചതിന് നന്ദി. താഴെ നൽകിയ QR കോഡ് വഴി പണമടയ്ക്കാം." : "Thank you for riding with EyAuto. Pay via UPI QR below.")
                  : (lang === "ml" ? "വളാഞ്ചേരിയിലെ ഡ്രൈവർമാർക്ക് നോട്ടിഫിക്കേഷൻ അയച്ചു." : "Alerting nearby drivers in Valanchery.")}
              </p>
            </div>

            {/* Driver & Vehicle Details */}
            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs text-left space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-gray-200">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{driverInfo.name}</p>
                  <p className="text-gray-500 text-[11px]">{driverInfo.vehicleNumber} &bull; Auto Rickshaw</p>
                </div>
                <a
                  href={`tel:${driverInfo.phone}`}
                  className="bg-green-100 text-green-700 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1 hover:bg-green-200 transition"
                >
                  <PhoneCall size={14} />
                  <span>Call</span>
                </a>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-gray-500">{lang === "ml" ? "ചാർജ്ജ്:" : "Total Fare:"}</span>
                <span className="font-extrabold text-base text-gray-900">₹{currentFare}</span>
              </div>
            </div>

            {/* 2. COMPLETED RIDE UPI QR CODE BILL */}
            {currentStatus === "Completed" && (
              <div className="bg-yellow-50 border-2 border-yellow-400 p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-center gap-1.5 text-yellow-900 font-extrabold text-sm">
                  <QrCode size={18} />
                  <span>{lang === "ml" ? "തത്സമയ UPI QR കോഡ് പേയ്‌മെന്റ്" : "Live UPI QR Code Bill"}</span>
                </div>

                <div className="bg-white p-3 rounded-2xl inline-block shadow-md border">
                  <img
                    src={upiQrUrl}
                    alt="UPI Payment QR"
                    className="w-40 h-40 mx-auto"
                  />
                  <p className="text-[10px] text-gray-500 mt-1 font-semibold">
                    GPay &bull; PhonePe &bull; Paytm &bull; BHIM
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-1">
                  <a
                    href={upiUri}
                    className="w-full bg-black hover:bg-gray-800 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                  >
                    <span>{lang === "ml" ? "GPay / PhonePe ആപ്പ് തുറക്കുക" : "Open GPay / PhonePe App"}</span>
                  </a>

                  {!isPaid ? (
                    <button
                      onClick={() => setIsPaid(true)}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5"
                    >
                      <Banknote size={15} />
                      <span>{lang === "ml" ? "പണമായി നൽകി (Paid by Cash)" : "Paid by Cash"}</span>
                    </button>
                  ) : (
                    <div className="bg-green-100 text-green-800 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1">
                      <CheckCircle size={15} />
                      <span>{lang === "ml" ? "പേയ്‌മെന്റ് വിജയകരം!" : "Payment Confirmed!"}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 3. WHATSAPP LIVE SHARE & TRACKING BUTTONS */}
            <div className="space-y-2">
              <button
                onClick={handleShareWhatsApp}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition"
              >
                <Share2 size={16} />
                <span>{lang === "ml" ? "വാട്സാപ്പിൽ ലൈവ് ട്രിപ്പ് ഷെയർ ചെയ്യുക" : "Share Trip on WhatsApp (Safety SOS)"}</span>
              </button>

              <div className="flex gap-2">
                <Link
                  to={`/destination/${tripDetails.originCoords.lat},${tripDetails.originCoords.lng}`}
                  className="flex-1 bg-black text-white hover:bg-gray-800 font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
                >
                  <Navigation size={14} className="text-yellow-400" />
                  <span>{lang === "ml" ? "മാപ്പിൽ ലൈവ് ട്രാക്ക് ചെയ്യുക" : "Track on Leaflet Map"}</span>
                </Link>
                <button
                  onClick={() => {
                    setIsRequestConfirmed(false);
                    setRiderID("");
                    setIsPaid(false);
                  }}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-xl text-xs font-semibold"
                >
                  {lang === "ml" ? "പുതിയ റൈഡ്" : "New Ride"}
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
          <ShieldCheck size={14} className="text-green-600" />
          <span>EyAuto Valanchery 1.0 &bull; 100% Safe & Verified Auto Drivers</span>
        </div>
      </div>
    </div>
  );
};

export default Chooseride;
