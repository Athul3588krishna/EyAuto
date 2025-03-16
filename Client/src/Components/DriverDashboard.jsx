import { useEffect, useState } from "react";
import axios from "axios";
import Navbaaar from "../Pages/Navbaaar";

const DriverDashboard = () => {
  const [allRides, setAllRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [driverProfile, setDriverProfile] = useState({
    driverName: "John Doe",
    vehicle: "Auto",
    rating: 4.8,
    totalRides: 156,
    isOnline: true
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileFormData, setProfileFormData] = useState({});

  useEffect(() => {
    setProfileFormData({ ...driverProfile });
  }, [driverProfile]);

  const handleAcceptRide = async (rideId) => {
    try {
      await axios.post("http://localhost:8000/api/driver/accept-ride", { rideId });
      fetchAvailableRides();
    } catch (error) {
      console.log("error Fetching accept ride:", error);
    }
  };

  const fetchAvailableRides = async function() {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8000/api/driver/get-allAvailableRides");
      setAllRides(response.data.ride);
    } catch (error) {
      console.error("Error fetching rides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileFormData((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfileChanges = async () => {
    try {
      // In a real application, you would make an API call here
      // await axios.put("http://localhost:8000/api/driver/update-profile", profileFormData);
      setDriverProfile(profileFormData);
      setIsEditingProfile(false);
      // Show success notification
    } catch (error) {
      console.error("Error updating profile:", error);
      // Show error notification
    }
  };

  useEffect(() => {
    fetchAvailableRides();
    const interval = setInterval(fetchAvailableRides, 10000); // Refresh every 10 seconds
    
    // Mock API call to fetch driver profile in a real application
    // const fetchDriverProfile = async () => {
    //   try {
    //     const response = await axios.get("http://localhost:8000/api/driver/profile");
    //     setDriverProfile(response.data);
    //   } catch (error) {
    //     console.error("Error fetching profile:", error);
    //   }
    // };
    // fetchDriverProfile();
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="driver-dashboard bg-gray-50 min-h-screen">
      <Navbaaar />
      
      {/* Profile Management Section */}
      <div className="fixed top-16 left-4 z-10">
        <div className="relative">
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md hover:shadow-lg transition-all"
          >
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
              {driverProfile.driverName.charAt(0)}
            </div>
            <span className="font-medium">{driverProfile.driverName}</span>
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={showProfileMenu ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
            </svg>
          </button>
          
          {showProfileMenu && (
            <div className="absolute left-0 mt-2 w-72 bg-white rounded-lg shadow-xl">
              {!isEditingProfile ? (
                // View Profile
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Driver Profile</h3>
                    <button 
                      onClick={() => setIsEditingProfile(true)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                  </div>
                  
                  <div className="flex items-center mb-4">
                    <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {driverProfile.driverName.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold">{driverProfile.driverName}</h4>
                      <div className="text-sm text-gray-500">{driverProfile.vehicle} Driver</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center">
                        <span className="text-yellow-500 mr-1">★</span>
                        <span>{driverProfile.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Rides</span>
                      <span>{driverProfile.totalRides}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status</span>
                      <span className={`flex items-center ${driverProfile.isOnline ? 'text-green-500' : 'text-gray-500'}`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${driverProfile.isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        {driverProfile.isOnline ? 'Online' : 'Offline'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <button className="text-gray-600 hover:text-gray-800 text-sm">Account Settings</button>
                  </div>
                </div>
              ) : (
                // Edit Profile
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Edit Profile</h3>
                    <button 
                      onClick={() => setIsEditingProfile(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                  
                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="driverName"
                        value={profileFormData.driverName}
                        onChange={handleProfileChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Vehicle Type</label>
                      <select
                        name="vehicle"
                        value={profileFormData.vehicle}
                        onChange={handleProfileChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-yellow-500 focus:ring focus:ring-yellow-500 focus:ring-opacity-50"
                      >
                        <option value="Moto">Moto</option>
                        <option value="Auto">Auto</option>
                        <option value="Car">Car</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <div className="mt-1 flex items-center">
                        <label className="inline-flex items-center mr-4">
                          <input
                            type="radio"
                            name="isOnline"
                            checked={profileFormData.isOnline === true}
                            onChange={() => setProfileFormData({...profileFormData, isOnline: true})}
                            className="text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-2">Online</span>
                        </label>
                        <label className="inline-flex items-center">
                          <input
                            type="radio"
                            name="isOnline"
                            checked={profileFormData.isOnline === false}
                            onChange={() => setProfileFormData({...profileFormData, isOnline: false})}
                            className="text-yellow-500 focus:ring-yellow-500"
                          />
                          <span className="ml-2">Offline</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={saveProfileChanges}
                      className="w-full bg-yellow-500 text-black py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Main Dashboard Content */}
      <div className="max-w-6xl mx-auto p-4 pt-24">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Available Rides</h2>
          <div className="flex items-center space-x-2">
            <span className={`inline-flex h-3 w-3 rounded-full ${driverProfile.isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
            <span className="text-sm font-medium">{driverProfile.isOnline ? 'You are online' : 'You are offline'}</span>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading available rides...</p>
          </div>
        ) : allRides.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            <div className="text-xl font-medium text-gray-500 mb-2">No rides available</div>
            <p className="text-gray-400">Check back soon for new ride requests</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allRides.map((ride) => (
              <div key={ride._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-semibold text-lg">${ride.price}</div>
                    <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{ride.distance}</div>
                  </div>
                  <div className="text-sm text-gray-500">Estimated travel time: 25 mins</div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-start mb-4">
                    <div className="flex flex-col items-center mr-3">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <div className="w-0.5 h-12 bg-gray-200 my-1"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div>
                        <div className="text-xs text-gray-500 font-medium">PICKUP</div>
                        <div className="text-sm">{ride.destinationFrom}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">DROPOFF</div>
                        <div className="text-sm">{ride.destinationTo}</div>
                      </div>
                    </div>
                  </div>
                  
                  {ride.status !== "Accepted" ? (
                    <button
                      className="w-full bg-black text-white py-2.5 px-4 rounded-md hover:bg-yellow-500 hover:text-black transition-colors duration-300 font-medium"
                      onClick={() => handleAcceptRide(ride._id)}
                    >
                      Accept Ride
                    </button>
                  ) : (
                    <div className="w-full bg-green-100 text-green-700 py-2.5 px-4 rounded-md text-center font-medium">
                      Ride Accepted
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;