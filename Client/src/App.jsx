import { Outlet, Route, Routes } from "react-router";
import "./App.css";
import About from "./Components/About";
import Drive from "./Components/Drive";
import Footer from "./Pages/Homepage/Footer";
import Home from "./Pages/Homepage/Home";
import Navbar from "./Pages/Homepage/Navbar";
import Chooseride from "./Pages/Login/Chooseride";
import Options from "./Pages/Login/Options";
import Rider from "./Pages/Login/Rider";
import DriverRegister from "./Pages/Register/DriverRegister";
import RiderRegister from "./Pages/Register/RiderRegister";
import DriverDashboard from "./Components/DriverDashboard";
import MapWithDistance from "./Pages/Destination/MapWithDistance";
import RiderDestination from "./Pages/Destination/RiderDestination";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";

function App() {
  return (
    <div className="overflow-x-hidden min-h-screen flex flex-col justify-between">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="login" element={<Options />} />
        <Route path="signup" element={<Options />} />
        <Route path="to-driver" element={<DriverRegister />} />
        <Route path="to-rider" element={<RiderRegister />} />
        <Route path="to-drive" element={<Rider />} />
        <Route path="to-ride" element={<Chooseride />} />
        <Route path="to-drivee" element={<Drive />} />
        <Route path="to-dashboard" element={<DriverDashboard />} />
        <Route path="to-chooseride" element={<RiderDestination />} />
        <Route path="destination/:id" element={<MapWithDistance />} />
        <Route path="about" element={<About />} />
        <Route path="driveregister" element={<DriverRegister />} />
        
        {/* Admin Portal Routes */}
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="admin/login" element={<AdminLogin />} />

        <Route path="*" element={<Layout />} />
      </Routes>
    </div>
  );
}

export default App;

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
