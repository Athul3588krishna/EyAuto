

const Navbaaar = () => {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
      {/* Uber Logo */}
     <div className="px-10">
     <span className="font-bold animate-pulse text-xl"><span className="text-black font-bold text-2xl">V</span >alan<span className="text-yellow-500"><span className="font-bold text-2xl">P</span>ulse</span></span>
            
     </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        {/* Ride */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="text-lg">🚗</span> {/* Replace with an icon */}
          <span className="text-gray-700 font-medium">Ride</span>
        </div>

        {/* Rentals */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="text-lg">🕒</span> {/* Replace with an icon */}
          <span className="text-gray-700 font-medium">Rentals</span>
        </div>

        {/* My Trips */}
        <div className="flex items-center space-x-2 cursor-pointer">
          <span className="text-gray-700 font-medium">My trips</span>
        </div>

        {/* Profile Icon */}
        <div className="w-8 h-8 rounded-full bg-gray-200 flex justify-center items-center cursor-pointer">
          <span className="text-lg">👤</span> {/* Replace with profile icon */}
        </div>
      </div>
    </div>
  );
};

export default Navbaaar;
