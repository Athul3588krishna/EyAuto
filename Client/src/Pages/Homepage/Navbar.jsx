import { UpdateFollower } from "react-mouse-follower";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Framer Motion animation variants
  const variants = {
    open: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    closed: { opacity: 0, x: "-100%", transition: { duration: 0.5 } },
  };
  return (
    <div className="lg:mx-12 lg:my-8 m">
      <UpdateFollower
        mouseOptions={{
          backgroundColor: "yellow",
          zIndex: "999",
          followSpeed: "1.5",
        }}
      >
        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 3 }}
          transition={{ duration: 3, delay: 0.5 }}
          className="bg-white text-black"
        >
          <div className="container  px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-8">
                <span className="font-bold animate-pulse text-xl">
                  <span className="text-black font-bold text-2xl">V</span>alan
                  <span className="text-yellow-500">
                    <span className="font-bold text-2xl">P</span>ulse
                  </span>
                </span>
                <div className="hidden md:block space-x-4">
                  <Link to="/" className="hover:opacity-75">
                    Home
                  </Link>
                  <Link to="#" className="hover:opacity-75">
                    Ride
                  </Link>
                  <Link to={"/to-drivee"} className="hover:opacity-75">
                    Drive
                  </Link>
                  <Link to="#" className="hover:opacity-75">
                    Contact
                  </Link>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-4">
                <button className="hover:opacity-75">EN</button>
                <button className=" hover:opacity-75">Help</button>
                <Link to={"login"} className="hover:opacity-75">
                  Log in
                </Link>
                <Link
                  to={"signup"}
                  className="sm:w-[150px] sm:px-10  bg-yellow-300 text-black px-4 py-2 rounded-full hover:bg-gray-100"
                >
                  Sign up
                </Link>
              </div>
              <div className="block md:hidden">
                {/* <button>Doo</button> */}
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
                        transition={{ duration: 0.3 }}
                        className="absolute"
                      >
                        <CloseIcon />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hamburger"
                        initial={{ opacity: 0, rotate: 90, scale: 0.8 }}
                        animate={{ opacity: 1, rotate: 0, scale: 1 }}
                        exit={{ opacity: 0, rotate: -90, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                      >
                        <Hamburger />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* <motion.div
          initial="closed"
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: { y: 0, opacity: 1, transition: { duration: 0.5 } },
            closed: { y: "-100%", opacity: 0, transition: { duration: 0.5 } },
          }}
          className="absolute top-16 left-0 w-full bg-gray-800 text-white z-10 flex flex-col items-center py-8 md:hidden"
        >
          <ul className="space-y-4 text-lg">
            <li>
              <a href="#home" onClick={() => setIsOpen(false)}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" onClick={() => setIsOpen(false)}>
                About
              </a>
            </li>
            <li>
              <a href="#services" onClick={() => setIsOpen(false)}>
                Services
              </a>
            </li>
            <li>
              <a href="#contact" onClick={() => setIsOpen(false)}>
                Contact
              </a>
            </li>
          </ul>
        </motion.div> */}
      </UpdateFollower>
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
      className="size-6"
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
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18 18 6M6 6l12 12"
      />
    </svg>
  );
};
