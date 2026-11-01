import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/LanguageContext";

const Banner = () => {
  const { lang, t } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className="flex items-center justify-center sm:mx-6 lg:mx-10 p-4"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="mx-4 sm:mx-6 lg:mx-14">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              {lang === "ml" ? (
                <>
                  വളാഞ്ചേരിയിൽ എവിടെയും{" "}
                  <span className="text-yellow-500 underline decoration-black decoration-4">
                    ഓട്ടോ ബുക്ക്
                  </span>{" "}
                  ചെയ്യാം
                </>
              ) : (
                <>
                  Get Around{" "}
                  <span className="text-yellow-500 underline decoration-black decoration-4">
                    Valanchery
                  </span>{" "}
                  with Ease
                </>
              )}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 my-5 leading-relaxed">
              {t("tagline")}
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/to-chooseride"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-extrabold px-7 py-3.5 text-base rounded-full shadow-lg transition duration-200"
              >
                {t("bookAutoNow")}
              </Link>
              <Link
                to="/to-driver"
                className="border-2 border-black text-black hover:bg-black hover:text-white font-extrabold px-7 py-3.5 text-base rounded-full transition duration-200"
              >
                {t("driveWithPride")}
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <motion.div className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-300">
              <motion.img
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
                src="/images/auto.png"
                alt="Auto Rickshaw"
                className="w-full h-auto drop-shadow-2xl"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-yellow-200 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
            <div className="absolute -top-6 -left-6 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-yellow-100 rounded-full filter blur-3xl opacity-50"></div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Banner;
