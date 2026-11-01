import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Shield, Globe } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, toggleLanguage, t } = useLanguage();

  return (
    <div className="lg:mx-12 lg:my-6">
      <nav className="bg-white text-black py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/" className="font-extrabold text-2xl flex items-center gap-1">
                <span>Ey</span>
                <span className="text-yellow-500">Auto</span>
                <span className="text-xs bg-black text-yellow-400 font-bold px-2 py-0.5 rounded ml-1">
                  VALANCHERY
                </span>
              </Link>
              <div className="hidden md:flex space-x-6 text-sm font-semibold text-gray-700">
                <Link to="/" className="hover:text-yellow-600 transition">
                  {t("home")}
                </Link>
                <Link to="/to-chooseride" className="hover:text-yellow-600 transition">
                  {t("bookRide")}
                </Link>
                <Link to="/to-driver" className="hover:text-yellow-600 transition">
                  {t("driveWithUs")}
                </Link>
                <Link to="/to-dashboard" className="hover:text-yellow-600 transition">
                  {t("driverDashboard")}
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {/* Language Toggle Pill */}
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1.5 bg-gray-100 hover:bg-yellow-100 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full border border-gray-300 transition"
                title="Switch Language"
              >
                <Globe size={13} className="text-yellow-600" />
                <span>{lang === "en" ? "മലയാളം" : "English"}</span>
              </button>

              <Link
                to="/admin"
                className="text-xs text-gray-500 hover:text-black font-semibold flex items-center gap-1 px-2 py-1 rounded"
              >
                <Shield size={14} className="text-yellow-500" />
                <span>{t("admin")}</span>
              </Link>
              <Link
                to="/login"
                className="text-sm font-bold text-gray-800 hover:text-black px-3 py-2"
              >
                {t("signIn")}
              </Link>
              <Link
                to="/to-chooseride"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-5 py-2.5 rounded-full text-sm shadow-sm transition"
              >
                {t("rideNow")}
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 bg-gray-100 text-gray-800 text-xs font-bold px-2.5 py-1 rounded-full border border-gray-300"
              >
                <Globe size={12} className="text-yellow-600" />
                <span>{lang === "en" ? "മല" : "EN"}</span>
              </button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CloseIcon />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hamburger"
                      initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Hamburger />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-3 font-semibold text-sm">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-800 hover:text-yellow-600"
            >
              {t("home")}
            </Link>
            <Link
              to="/to-chooseride"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-800 hover:text-yellow-600"
            >
              {t("bookRide")}
            </Link>
            <Link
              to="/to-driver"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-800 hover:text-yellow-600"
            >
              {t("driveWithUs")}
            </Link>
            <Link
              to="/to-dashboard"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-gray-800 hover:text-yellow-600"
            >
              {t("driverDashboard")}
            </Link>
            <Link
              to="/admin"
              onClick={() => setIsOpen(false)}
              className="block py-2 text-yellow-600 font-bold"
            >
              Admin Control Panel
            </Link>
            <div className="pt-2 border-t flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="w-full text-center border py-2 rounded-xl"
              >
                {t("signIn")}
              </Link>
              <Link
                to="/to-chooseride"
                onClick={() => setIsOpen(false)}
                className="w-full text-center bg-yellow-400 py-2 rounded-xl font-bold"
              >
                {t("rideNow")}
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

const Hamburger = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  );
};

const CloseIcon = function () {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};
