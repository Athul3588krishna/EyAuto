

const Rider = () => {
  return (
   <>
   <div className="flex">
      <div className="bg-white p-6 rounded-lg shadow-lg mx-24 my-28 max-w-md  w-full">
      <h1 className="text-4xl font-bold mb-8">Go anywhere with Valan<span className="text-yellow-300">Pulse</span></h1>
      
      <div className="flex space-x-4 mb-6">
        <button
          
          className="flex-1 flex items-center justify-center space-x-2 bg-gray-100"
        >
          <div className="h-5 w-5" />
          <span>Ride</span>
        </button>
        <button
         
          className="flex-1 flex items-center justify-center space-x-2"
        >
          <package2 className="h-5 w-5" />
          <span>Package</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 bg-black rounded-full"></div>
          <input
            placeholder="Pickup location"
            className="pl-8 bg-gray-100"
          />
        </div>
        
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 w-2 h-2 border-2 border-black rounded-full"></div>
          <input
            placeholder="Dropoff location"
            className="pl-8 bg-gray-100"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button  className="w-full">
            Today
          </button>
          <button className="w-full">
            Now
          </button>
        </div>

       
      </div>
      
    </div>
    <div className="map-img my-28">
      <img className="h-[500px] w-[700px]" src="../images/map.png" alt="" />
    </div>
    
    </div>
   </>
  )
}

export default Rider