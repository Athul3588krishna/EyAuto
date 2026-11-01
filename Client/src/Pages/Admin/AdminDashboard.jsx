import { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../../apiConfig";
import {
  Shield,
  LogOut,
  Users,
  Car,
  TrendingUp,
  RefreshCw,
  CheckCircle,
  XCircle,
  Trash2,
  Navigation,
  Activity,
  Layers,
} from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configure Leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("rides");
  const [stats, setStats] = useState({
    totalDrivers: 0,
    totalRides: 0,
    totalUsers: 0,
    pendingRides: 0,
    acceptedRides: 0,
    completedRides: 0,
    totalRevenue: 0,
  });

  const [rides, setRides] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Authenticate Admin
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [statsRes, ridesRes, driversRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/stats`),
        axios.get(`${API_BASE_URL}/api/admin/rides`),
        axios.get(`${API_BASE_URL}/api/admin/drivers`),
      ]);

      if (statsRes.data?.stats) setStats(statsRes.data.stats);
      if (ridesRes.data?.rides) setRides(ridesRes.data.rides);
      if (driversRes.data?.drivers) setDrivers(driversRes.data.drivers);
    } catch (err) {
      console.error("Admin data fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 10000); // 10s auto refresh
    return () => clearInterval(interval);
  }, [fetchDashboardData]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  const handleUpdateRideStatus = async (rideId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/admin/rides/${rideId}/status`, {
        status: newStatus,
      });
      fetchDashboardData();
    } catch (err) {
      console.error("Update ride error:", err);
    }
  };

  const handleDeleteRide = async (rideId) => {
    if (!window.confirm("Are you sure you want to delete this ride?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/rides/${rideId}`);
      fetchDashboardData();
    } catch (err) {
      console.error("Delete ride error:", err);
    }
  };

  const handleToggleDriverStatus = async (driverId, currentStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/api/admin/drivers/${driverId}/status`, {
        isOnline: !currentStatus,
      });
      fetchDashboardData();
    } catch (err) {
      console.error("Toggle driver error:", err);
    }
  };

  const handleDeleteDriver = async (driverId) => {
    if (!window.confirm("Are you sure you want to remove this driver?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/api/admin/drivers/${driverId}`);
      fetchDashboardData();
    } catch (err) {
      console.error("Delete driver error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Admin Navbar */}
      <header className="bg-slate-800/90 border-b border-slate-700/80 sticky top-0 z-50 px-6 py-4 backdrop-blur">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 text-black rounded-xl flex items-center justify-center font-black">
              <Shield size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl text-white">
                  Ey<span className="text-yellow-400">Auto</span>
                </span>
                <span className="bg-yellow-400/20 text-yellow-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider border border-yellow-400/30">
                  Control Center
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Valanchery Operational Administration</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              className="flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 transition"
              title="Refresh Data"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <Link
              to="/"
              className="text-xs bg-slate-700/60 hover:bg-slate-700 px-3 py-2 rounded-xl text-slate-300 font-semibold"
            >
              Homepage
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 px-3.5 py-2 rounded-xl text-xs font-bold transition"
            >
              <LogOut size={14} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/60 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Gross Bookings</span>
              <div className="w-8 h-8 rounded-lg bg-green-500/20 text-green-400 flex items-center justify-center">
                <TrendingUp size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">₹{stats.totalRevenue}</p>
            <p className="text-[11px] text-slate-400 mt-1">Across all registered trips</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/60 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Total Rides</span>
              <div className="w-8 h-8 rounded-lg bg-yellow-500/20 text-yellow-400 flex items-center justify-center">
                <Car size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{stats.totalRides}</p>
            <p className="text-[11px] text-yellow-400 mt-1 font-semibold">
              {stats.pendingRides} Pending &bull; {stats.acceptedRides} Ongoing
            </p>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/60 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">Active Drivers</span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <Users size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-white">{stats.totalDrivers}</p>
            <p className="text-[11px] text-slate-400 mt-1">Auto & Cab partners</p>
          </div>

          <div className="bg-slate-800 p-5 rounded-2xl border border-slate-700/60 shadow-lg">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-bold uppercase tracking-wider">System State</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Activity size={16} />
              </div>
            </div>
            <p className="text-2xl font-black text-emerald-400">Online</p>
            <p className="text-[11px] text-slate-400 mt-1">OpenStreetMap & OSRM Active</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-700 space-x-2">
          <button
            onClick={() => setActiveTab("rides")}
            className={`pb-3 px-4 font-bold text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === "rides"
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Car size={16} />
            <span>Rides & Dispatch ({rides.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("drivers")}
            className={`pb-3 px-4 font-bold text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === "drivers"
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Users size={16} />
            <span>Driver Fleet ({drivers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("map")}
            className={`pb-3 px-4 font-bold text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === "map"
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Navigation size={16} />
            <span>Town Map View</span>
          </button>

          <button
            onClick={() => setActiveTab("settings")}
            className={`pb-3 px-4 font-bold text-sm transition border-b-2 flex items-center gap-2 ${
              activeTab === "settings"
                ? "border-yellow-400 text-yellow-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            <Layers size={16} />
            <span>Tariff Rates</span>
          </button>
        </div>

        {/* TAB 1: RIDES MANAGEMENT */}
        {activeTab === "rides" && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <h2 className="font-extrabold text-base text-white">Live Rides Feed</h2>
              <span className="text-xs text-slate-400">Real-time status updates</span>
            </div>

            {rides.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Car className="mx-auto mb-3 opacity-30" size={40} />
                <p>No ride requests recorded yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/60 uppercase text-slate-400 font-bold tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Ride ID</th>
                      <th className="p-3.5">Pickup & Destination</th>
                      <th className="p-3.5">Vehicle</th>
                      <th className="p-3.5">Fare</th>
                      <th className="p-3.5">Distance</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {rides.map((r) => (
                      <tr key={r._id} className="hover:bg-slate-750 transition">
                        <td className="p-3.5 font-mono text-[11px] text-slate-400">
                          {r._id.slice(-6).toUpperCase()}
                        </td>
                        <td className="p-3.5 max-w-xs">
                          <p className="font-bold text-white truncate flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span>
                            {r.destinationFrom}
                          </p>
                          <p className="text-slate-400 truncate flex items-center gap-1 mt-0.5">
                            <span className="w-2 h-2 rounded-full bg-red-500 inline-block"></span>
                            {r.destinationTo}
                          </p>
                        </td>
                        <td className="p-3.5 font-bold uppercase text-yellow-400">
                          {r.rideType || "AUTO"}
                        </td>
                        <td className="p-3.5 font-black text-white text-sm">
                          ₹{r.price}
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {r.distance} &bull; {r.time}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              r.status === "Accepted"
                                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                : r.status === "Completed"
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : r.status === "Cancelled"
                                ? "bg-red-500/20 text-red-400 border border-red-500/30"
                                : "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 animate-pulse"
                            }`}
                          >
                            {r.status || "Pending"}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-1 whitespace-nowrap">
                          {r.status !== "Completed" && (
                            <button
                              onClick={() => handleUpdateRideStatus(r._id, "Completed")}
                              className="bg-green-500/20 hover:bg-green-500/30 text-green-400 px-2 py-1 rounded-lg font-bold"
                              title="Mark as Completed"
                            >
                              <CheckCircle size={14} className="inline mr-1" />
                              Done
                            </button>
                          )}
                          {r.status !== "Cancelled" && (
                            <button
                              onClick={() => handleUpdateRideStatus(r._id, "Cancelled")}
                              className="bg-red-500/20 hover:bg-red-500/30 text-red-400 px-2 py-1 rounded-lg font-bold"
                              title="Cancel Ride"
                            >
                              <XCircle size={14} className="inline mr-1" />
                              Cancel
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteRide(r._id)}
                            className="text-slate-500 hover:text-red-400 p-1"
                            title="Delete Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: DRIVERS FLEET */}
        {activeTab === "drivers" && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <h2 className="font-extrabold text-base text-white">Registered Driver Partners</h2>
              <Link
                to="/to-driver"
                className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs font-bold px-3 py-1.5 rounded-xl transition"
              >
                + Register New Driver
              </Link>
            </div>

            {drivers.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                <Users className="mx-auto mb-3 opacity-30" size={40} />
                <p>No driver partners registered yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/60 uppercase text-slate-400 font-bold tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Driver Name</th>
                      <th className="p-3.5">Vehicle</th>
                      <th className="p-3.5">License Number</th>
                      <th className="p-3.5">Vehicle Reg / Aadhaar</th>
                      <th className="p-3.5">GPS Location</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {drivers.map((d) => (
                      <tr key={d._id} className="hover:bg-slate-750 transition">
                        <td className="p-3.5">
                          <p className="font-bold text-white">{d.driverName}</p>
                          <p className="text-[10px] text-slate-400">Rating: ★ {d.rating || 4.9}</p>
                        </td>
                        <td className="p-3.5 font-bold text-yellow-400">
                          {d.vehicle}
                        </td>
                        <td className="p-3.5 font-mono text-slate-300">
                          {d.drivingLicense}
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {d.adhaarCard || d.panCard || "Verified"}
                        </td>
                        <td className="p-3.5 text-[11px] text-slate-400 font-mono">
                          {d.latitude?.toFixed(4) || "10.8801"}, {d.longitude?.toFixed(4) || "76.0711"}
                        </td>
                        <td className="p-3.5">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                              d.isOnline
                                ? "bg-green-500/20 text-green-400 border border-green-500/30"
                                : "bg-slate-600/30 text-slate-400 border border-slate-600"
                            }`}
                          >
                            {d.isOnline ? "🟢 Online" : "⚪ Offline"}
                          </span>
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            onClick={() => handleToggleDriverStatus(d._id, d.isOnline)}
                            className="bg-slate-700 hover:bg-slate-600 text-xs text-slate-200 px-2.5 py-1 rounded-lg font-semibold"
                          >
                            Toggle Status
                          </button>
                          <button
                            onClick={() => handleDeleteDriver(d._id)}
                            className="text-slate-500 hover:text-red-400 p-1"
                            title="Remove Driver"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: OPENSTREETMAP LEAFLET TOWN MONITOR */}
        {activeTab === "map" && (
          <div className="bg-slate-800 rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl">
            <div className="p-4 bg-slate-800/80 border-b border-slate-700 flex items-center justify-between">
              <div>
                <h2 className="font-extrabold text-base text-white">
                  Valanchery Live Operations Map (OpenStreetMap)
                </h2>
                <p className="text-xs text-slate-400">
                  Tracking active auto rickshaws & passenger pickup requests
                </p>
              </div>
            </div>

            <div className="h-[520px] w-full relative">
              <MapContainer
                center={[10.8801, 76.0711]}
                zoom={14}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Valanchery Center Marker */}
                <Marker position={[10.8801, 76.0711]}>
                  <Popup>
                    <div className="text-xs font-bold text-gray-900">
                      📍 Valanchery Town Center
                    </div>
                  </Popup>
                </Marker>

                {/* Driver Markers */}
                {drivers.map((d, idx) => (
                  <Marker
                    key={d._id || idx}
                    position={[
                      d.latitude || 10.8801 + (idx + 1) * 0.003,
                      d.longitude || 76.0711 + (idx + 1) * 0.003,
                    ]}
                  >
                    <Popup>
                      <div className="text-xs space-y-1 text-gray-900">
                        <p className="font-bold">🛺 {d.driverName}</p>
                        <p>{d.vehicle} &bull; {d.drivingLicense}</p>
                        <p className="text-green-600 font-semibold">
                          Status: {d.isOnline ? "Online" : "Offline"}
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                ))}

                {/* Ride Pickup Markers */}
                {rides
                  .filter((r) => r.status === "Pending" || r.status === "Accepted")
                  .map((r, idx) => (
                    <Marker
                      key={`ride-${r._id || idx}`}
                      position={[
                        r.originCoords?.lat || 10.8820 - idx * 0.002,
                        r.originCoords?.lng || 76.0730 + idx * 0.002,
                      ]}
                    >
                      <Popup>
                        <div className="text-xs space-y-1 text-gray-900">
                          <p className="font-bold text-yellow-700">Passenger Pickup</p>
                          <p><b>From:</b> {r.destinationFrom}</p>
                          <p><b>To:</b> {r.destinationTo}</p>
                          <p><b>Fare:</b> ₹{r.price} ({r.rideType})</p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MapContainer>
            </div>
          </div>
        )}

        {/* TAB 4: TARIFFS & SETTINGS */}
        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-400/20 text-yellow-400 rounded-xl flex items-center justify-center text-2xl">
                  🛺
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Auto Rickshaw Tariff</h3>
                  <p className="text-xs text-slate-400">Valanchery Standard</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Base Fare (First 1.5 km)</span>
                  <span className="font-bold text-white">₹30</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Rate per Additional Km</span>
                  <span className="font-bold text-white">₹10 / km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Waiting Charge</span>
                  <span className="font-bold text-white">₹2 / min</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center text-2xl">
                  🏍️
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Bike / Moto Tariff</h3>
                  <p className="text-xs text-slate-400">Single Passenger Express</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Base Fare</span>
                  <span className="font-bold text-white">₹20</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Rate per Additional Km</span>
                  <span className="font-bold text-white">₹8 / km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Waiting Charge</span>
                  <span className="font-bold text-white">₹1.5 / min</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-xl flex items-center justify-center text-2xl">
                  🚗
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">Cab / Taxi Tariff</h3>
                  <p className="text-xs text-slate-400">Sedan & Hatchback</p>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Base Fare</span>
                  <span className="font-bold text-white">₹50</span>
                </div>
                <div className="flex justify-between border-b border-slate-700 pb-2">
                  <span className="text-slate-400">Rate per Additional Km</span>
                  <span className="font-bold text-white">₹15 / km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Waiting Charge</span>
                  <span className="font-bold text-white">₹3 / min</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
