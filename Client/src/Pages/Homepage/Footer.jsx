import { Link } from "react-router-dom";
import { Shield } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-12 sm:px-6 lg:space-y-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <span className="font-extrabold text-2xl">
              Ey<span className="text-yellow-400">Auto</span>
            </span>
            <p className="mt-4 max-w-xs text-xs text-gray-400">
              Your trusted on-demand auto rickshaw platform in Valanchery, Kerala. Powered by OpenStreetMap.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <p className="font-bold text-sm uppercase text-yellow-400">Services</p>
              <ul className="mt-4 space-y-2 text-xs text-gray-300">
                <li>
                  <Link to="/to-chooseride" className="hover:text-yellow-400 transition">
                    Book Auto
                  </Link>
                </li>
                <li>
                  <Link to="/to-chooseride" className="hover:text-yellow-400 transition">
                    Book Bike
                  </Link>
                </li>
                <li>
                  <Link to="/to-driver" className="hover:text-yellow-400 transition">
                    Drive with Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-sm uppercase text-yellow-400">Portals</p>
              <ul className="mt-4 space-y-2 text-xs text-gray-300">
                <li>
                  <Link to="/to-driver" className="hover:text-yellow-400 transition">
                    Driver Registration
                  </Link>
                </li>
                <li>
                  <Link to="/to-dashboard" className="hover:text-yellow-400 transition">
                    Driver Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/admin"
                    className="hover:text-yellow-400 transition font-bold text-yellow-400/90 flex items-center gap-1 mt-1"
                  >
                    <Shield size={12} />
                    <span>Admin Control Panel</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-sm uppercase text-yellow-400">Location</p>
              <p className="mt-4 text-xs text-gray-300">
                Valanchery, Malappuram District, Kerala, India &bull; 676552
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-2">
          <p>
            &copy; {new Date().getFullYear()} EyAuto. All rights reserved. OpenStreetMap Leaflet integration.
          </p>
          <Link to="/admin/login" className="hover:text-yellow-400 transition text-[11px]">
            Admin Sign In &rarr;
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
