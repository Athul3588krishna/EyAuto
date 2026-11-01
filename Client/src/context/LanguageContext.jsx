/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const translations = {
  en: {
    home: "Home",
    bookRide: "Book Auto / Ride",
    driveWithUs: "Drive with Us",
    driverDashboard: "Driver Dashboard",
    admin: "Admin",
    signIn: "Sign in",
    rideNow: "Ride Now",
    getAround: "Get Around Valanchery with Ease",
    tagline: "Experience fast, reliable auto rickshaw & cab booking at your fingertips! Powered by OpenStreetMap.",
    bookAutoNow: "Book An Auto Now",
    driveWithPride: "Drive With Us",
    startTrip: "Start Trip",
    completeTrip: "Complete Trip",
    ridePin: "Your Ride Start PIN",
    shareWhatsApp: "Share Trip on WhatsApp",
    payUpi: "Pay via UPI / GPay",
    tripCompleted: "Trip Completed!",
    cashPayment: "Pay with Cash",
    enterOtp: "Enter Passenger 4-Digit PIN",
    verifyOtp: "Verify & Start Ride",
  },
  ml: {
    home: "ഹോം",
    bookRide: "ഓട്ടോ ബുക്ക് ചെയ്യുക",
    driveWithUs: "ഡ്രൈവർ ആകുക",
    driverDashboard: "ഡ്രൈവർ ഡാഷ്‌ബോർഡ്",
    admin: "അഡ്മിൻ",
    signIn: "ലോഗിൻ",
    rideNow: "ഇപ്പോൾ ബുക്ക് ചെയ്യുക",
    getAround: "വളാഞ്ചേരിയിൽ എവിടെയും സുരക്ഷിതമായി യാത്ര ചെയ്യാം",
    tagline: "വിശ്വസ്തരായ ഓട്ടോ ഡ്രൈവർമാർക്കൊപ്പം വേഗത്തിൽ യാത്ര ചെയ്യാം. ഓപ്പൺസ്ട്രീറ്റ് മാപ്പ് സംവിധാനം.",
    bookAutoNow: "ഓട്ടോ ബുക്ക് ചെയ്യുക",
    driveWithPride: "ഡ്രൈവറായി രജിസ്റ്റർ ചെയ്യുക",
    startTrip: "യാത്ര ആരംഭിക്കുക",
    completeTrip: "യാത്ര പൂർത്തിയാക്കുക",
    ridePin: "നിങ്ങളുടെ റൈഡ് PIN (OTP)",
    shareWhatsApp: "വാട്സാപ്പിൽ പങ്കിടുക",
    payUpi: "UPI / GPay വഴി പണമടയ്ക്കുക",
    tripCompleted: "യാത്ര വിജയകരമായി പൂർത്തിയായി!",
    cashPayment: "പണമായി നൽകുക (Cash)",
    enterOtp: "യാത്രക്കാരന്റെ 4-അക്ക PIN നൽകുക",
    verifyOtp: "വെരിഫൈ ചെയ്ത് യാത്ര തുടങ്ങുക",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => localStorage.getItem("appLang") || "ml");

  const toggleLanguage = () => {
    const nextLang = lang === "en" ? "ml" : "en";
    setLang(nextLang);
    localStorage.setItem("appLang", nextLang);
  };

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  useEffect(() => {
    localStorage.setItem("appLang", lang);
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useLanguage = () => useContext(LanguageContext);
