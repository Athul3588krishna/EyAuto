import { useEffect, useState } from "react";
import { Check, Bell, Search } from "lucide-react";
import { useLocation } from "react-router";
import axios from "axios";
import PropTypes from 'prop-types';

const Chooseride = () => {
  let location = useLocation();

  const [selectedRide, setSelectedRide] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isRequestConformed, setIsRequestConformed] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [riderID, setRiderID] = useState("")

  const handleRideSelect = (rideType) => {
    setSelectedRide(rideType);
  };

  const handleConfirmRide = async () => {
    if (selectedRide) {
      setIsConfirming(true);
      const res = await axios.post(
        "http://localhost:8000/api/rider/submit-ride",
        {
          status: "Pending",
          destination: location.state.distination,
          rideType: selectedRide,
          price: location.state.price[selectedRide],
          distance: location.state.distance,
          time: location.state.time,
        }
      );
      setRiderID(res.data.rideId)
      fetchRideStatus(res.data.rideId);
      setIsConfirming(false);
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  };

  const fetchRideStatus = async function (rideId) {
    console.log(rideId);

    if (rideId) {
      const res = await axios(
        "http://localhost:8000/api/rider/check-ride-status?rideId=" + rideId
      );
      setIsRequestConformed(true);
      setCurrentStatus(res.data.rideStats);
    }
  };

  useEffect(() => {
    if (isRequestConformed && riderID) {
      // Initial fetch
      fetchRideStatus(riderID);
      
      // Set up interval with riderID
      const interval = setInterval(() => {
        fetchRideStatus(riderID);
      }, 10000);
      
      // Cleanup interval
      return () => clearInterval(interval);
    }
  }, [isRequestConformed, riderID]);

  const rideIcons = {
    moto: "🏍️",
    auto: "🛺",
    sedan: "🚗",
  };

  return (
    <div className="h-screen">
      <div className="flex flex-col gap-3 p-4 max-w-md mx-auto relative">
        {/* Notification overlay */}
        {showNotification && (
          <div className="absolute top-0 left-0 right-0 bg-green-100 border border-green-500 text-green-700 px-4 py-3 rounded mb-4 shadow-md flex items-center justify-between z-10">
            <div className="flex items-center">
              <Bell className="mr-2" size={20} />
              <div>
                <p className="font-bold">Request sent!</p>
                <p className="text-sm">
                  Looking for your {selectedRide} driver
                </p>
              </div>
            </div>
            <div className="bg-green-200 p-2 rounded-full">
              {rideIcons[selectedRide]}
            </div>
          </div>
        )}

        {!isRequestConformed ? (
          <>
            {/* Moto Option */}
            <button
              className={`border rounded-lg p-3 w-full hover:bg-gray-50 transition-all ${
                selectedRide === "moto"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleRideSelect("moto")}
            >
              <div className="flex items-center justify-between">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  🏍️
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg">Moto</h3>
                    <p className="text-gray-500 text-sm">
                      {location.state.time}
                    </p>
                    <span className="inline-block text-sm text-white bg-blue-500 px-2 py-1 rounded mt-1">
                      {location.state.distance}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">
                    ₹{location.state.price.moto}
                  </span>
                  {selectedRide === "moto" && (
                    <Check className="text-blue-500" size={20} />
                  )}
                </div>
              </div>
            </button>

            {/* Auto Option */}
            <button
              className={`border rounded-lg p-3 hover:bg-gray-50 transition-all ${
                selectedRide === "auto"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleRideSelect("auto")}
            >
              <div className="flex items-center justify-between">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  🛺
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg">Auto</h3>
                    <p className="text-gray-500 text-sm">
                      {location.state.time}
                    </p>
                    <span className="inline-block text-sm text-white bg-blue-500 px-2 py-1 rounded mt-1">
                      {location.state.distance}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">
                    ₹{location.state.price.auto}
                  </span>
                  {selectedRide === "auto" && (
                    <Check className="text-blue-500" size={20} />
                  )}
                </div>
              </div>
            </button>

            {/* Sedan Option */}
            <button
              className={`border rounded-lg p-3 hover:bg-gray-50 transition-all ${
                selectedRide === "sedan"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
              onClick={() => handleRideSelect("sedan")}
            >
              <div className="flex items-center justify-between">
                <div className="h-16 w-16 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                  🚗
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <h3 className="font-bold text-lg">Go Sedan</h3>
                    <p className="text-gray-500 text-sm">
                      {location.state.time}
                    </p>
                    <span className="inline-block text-sm text-white bg-blue-500 px-2 py-1 rounded mt-1">
                      {location.state.distance}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold">₹{location.state.price.car}</span>
                  {selectedRide === "sedan" && (
                    <Check className="text-blue-500" size={20} />
                  )}
                </div>
              </div>
            </button>

            {/* Confirm Button */}
            <button
              className={`mt-4 py-3 rounded-lg font-medium text-black transition-all ${
                selectedRide
                  ? isConfirming
                    ? "bg-gray-300"
                    : "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
              disabled={!selectedRide || isConfirming}
              onClick={handleConfirmRide}
            >
              {isConfirming ? (
                <span className="flex items-center justify-center">
                  <div className="animate-spin h-5 w-5 border-2 border-gray-500 border-t-transparent rounded-full mr-2"></div>
                  Connecting...
                </span>
              ) : (
                `Confirm ${
                  selectedRide &&
                  selectedRide.charAt(0).toUpperCase() + selectedRide.slice(1)
                }`
              )}
            </button>
          </>
        ) : (
          <div>
            <UserWaitingCard
              currentStatus={currentStatus}
              destination={location.state.distination}
              distance={location.state.distance}
              estimatedTime={location.state.time}
              price={location.state.price[selectedRide]}
              selectedRide={selectedRide}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const UserWaitingCard = ({ 
  currentStatus, 
  destination, 
  selectedRide, 
  price, 
  distance, 
  estimatedTime 
}) => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    if (currentStatus?.toLowerCase() === 'pending') {
      const interval = setInterval(() => {
        setDots(prev => {
          if (prev.length >= 3) return '';
          return prev + '.';
        });
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [currentStatus]);

  const renderStatusAnimation = () => {
    if (currentStatus?.toLowerCase() === 'pending') {
      return (
        <div className="flex justify-center my-6">
          <div className="relative">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Search className="text-white" />
            </div>
            <div className="absolute top-0 left-0 w-16 h-16 bg-blue-400 rounded-full animate-ping opacity-50"></div>
          </div>
        </div>
      );
    } else if (currentStatus?.toLowerCase() === 'accepted') {
      return (
        <div className="flex justify-center my-6">
          <div className="relative">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="absolute -inset-2 bg-green-200 rounded-full opacity-0 animate-pulse">
              <div className="h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const getStatusTextStyles = () => {
    if (currentStatus?.toLowerCase() === 'pending') {
      return "text-blue-600";
    } else if (currentStatus?.toLowerCase() === 'accepted') {
      return "text-green-600";
    }
    return "text-gray-800";
  };
  
  const getStatusDisplay = () => {
    if (currentStatus?.toLowerCase() === 'pending') {
      return (
        <>
          {currentStatus}<span className="inline-block w-8 text-left">{dots}</span>
        </>
      );
    }
    return currentStatus;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Status with animations based on state */}
      <div className="mb-6">
        <h2 className={`text-xl font-bold text-center ${getStatusTextStyles()}`}>
          {getStatusDisplay()}
        </h2>
        
        {/* Different animations based on status */}
        {renderStatusAnimation()}
      </div>
      
      {/* Trip details card */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-gray-700">Destination:</div>
          <div className="text-gray-800">{destination?.to || destination}</div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-gray-700">Ride Type:</div>
          <div className="text-gray-800">{selectedRide}</div>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <div className="font-semibold text-gray-700">Price:</div>
          <div className="text-gray-800">${price}</div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Distance</span>
            <span className="font-medium">{distance}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Est. Time</span>
            <span className="font-medium">{estimatedTime}</span>
          </div>
        </div>
      </div>
      
      {/* Conditionally render button based on status */}
      {currentStatus?.toLowerCase() === 'pending' ? (
        <button className="w-full mt-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition duration-200">
          Cancel Request
        </button>
      ) : currentStatus?.toLowerCase() === 'accepted' ? (
        <button className="w-full mt-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition duration-200">
          Contact Driver
        </button>
      ) : null}
    </div>
  );
};

UserWaitingCard.propTypes = {
  currentStatus: PropTypes.string.isRequired,
  destination: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      to: PropTypes.string
    })
  ]).isRequired,
  selectedRide: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  distance: PropTypes.string.isRequired,
  estimatedTime: PropTypes.string.isRequired
};

export default Chooseride;
