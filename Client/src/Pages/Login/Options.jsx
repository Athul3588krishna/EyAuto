import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Options = () => {
  return (
    <div className="options-section my-32">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 3 }}
        transition={{ duration: 3, delay: 0.5 }}
        className="options flex flex-col md:flex-row items-center justify-evenly gap-10"
      >
        <div className="options">
          <img
            className="h-[250px] w-[400px]"
            src="https://img.freepik.com/free-vector/city-driver-concept-illustration_114360-1209.jpg"
            alt=""
          />
          <Link to={"/to-driver"} className="text-4xl">
            Sign up to drive & deliver
          </Link>
        </div>
        <div className="option2">
          <img
            className="h-[250px] w-[400px]"
            src="https://img.freepik.com/free-vector/car-sharing-concept-illustration_114360-16901.jpg"
            alt=""
          />
          <Link to={"/to-rider"} className="text-4xl">
            Create a rider account
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Options;
