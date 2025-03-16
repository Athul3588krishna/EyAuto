import { Outlet, Route, Routes } from "react-router";
import "./App.css";
import About from "./Components/About";
import Drive from "./Components/Drive";
import Banner from "./Pages/Homepage/Banner";
import Bannerform from "./Pages/Homepage/Bannerform";
import Drivehompage from "./Pages/Homepage/Drivehompage";
import Footer from "./Pages/Homepage/Footer";
import Home from "./Pages/Homepage/Home";
import Navbar from "./Pages/Homepage/Navbar";
import Rentcar from "./Pages/Homepage/Rentcar";
import Suggestions from "./Pages/Homepage/Suggestions";
import Valanbusiness from "./Pages/Homepage/Valanbusiness";
import Chooseride from "./Pages/Login/Chooseride";
import Login from "./Pages/Login/Login";
import Options from "./Pages/Login/Options";
import Rider from "./Pages/Login/Rider";
import DriverRegister from "./Pages/Register/DriverRegister";
import RiderRegister from "./Pages/Register/RiderRegister";
import Navbaaar from "./Pages/Navbaaar";
import DriverDashboard from "./Components/DriverDashboard";
import MapWithDistance from "./Pages/Destination/MapWithDistance";
import RiderDestination from "./Pages/Destination/RiderDestination";
import RegistrationForm from "./Pages/Registration/RegistrationForm";





function App() {
  return (
    <div className="overflow-x-hidden">
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
        {/* <Route path="to-chooseride" element={<Chooseride />} /> */}
        <Route path="/destination/:id" element={<MapWithDistance />} />
        <Route path="about" element={<About />} />
        <Route path="driveregister" element={<DriverRegister />} />


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
