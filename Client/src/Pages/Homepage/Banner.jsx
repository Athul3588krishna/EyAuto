import { motion } from "framer-motion"

const Banner = () => {

  

  return (
    <motion.div
    initial={{ opacity:0}}
          animate={{opacity:3}}
          transition={{ duration:3, delay:0.5}} 
    className="flex items-center justify-center sm:mx-6 lg:mx-10 p-4">
  <div className="container mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      {/* Left Content */}
      <div className="mx-4 sm:mx-6 lg:mx-14">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Get Around{' '}
          <span className=" animate-typing overflow-hidden whitespace-nowrap text-yellow-500">Valanchery</span>{' '}
          with Ease
        </h1>
        <p className="overflow-hidden whitespace-nowrap text-lg sm:text-xl lg:text-2xl text-gray-600 my-4">
          Experience the convenience of auto rickshaw booking at your fingertips!
        </p>
        {/* <div className="flex flex-wrap gap-4 pt-4">
          <button
            className="sm:w-[170px] border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-5 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg rounded-full"
          >
            Book A Ride
          </button>
          <button
            className="border border-gray-900 text-gray-900 hover:bg-yellow-300 hover:text-black font-semibold px-5 py-3 sm:px-8 sm:py-6 text-sm sm:text-lg rounded-full"
          >
            Learn More
          </button>
        </div> */}
        
      </div>

      {/* Right Image */}
      <motion.div  
      
      className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none">
        <div 
        
        className="relative z-10 transform hover:scale-105 transition-transform duration-300">
          <motion.img
          initial={{ opacity: 0, x:200}}
          animate={{opacity: 1, x:0}}
          transition={{ type: "spring", stiffness: 100, delay:0.2}}
            src="../images/auto.png"
            alt="Auto Rickshaw"
            className="w-full h-auto"
          />
        </div>
        {/* Decorative Elements */}
        <div className="absolute -bottom-6 -right-6 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-yellow-200 rounded-full filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute -top-6 -left-6 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-yellow-100 rounded-full filter blur-3xl opacity-50"></div>
      </motion.div>
    </div>
  </div>
</motion.div>

  )
}

export default Banner