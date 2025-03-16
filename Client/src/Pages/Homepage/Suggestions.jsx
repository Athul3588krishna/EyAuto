const Suggestions = () => {
  return (
    <div className="container my-6 mx-5 lg:mx-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4  m-auto gap-5">
        <div className="flex bg-gray-300 hover:bg-white hover:scale-110 duration-300 hover:shadow-sm  rounded-xl justify-evenly p-5">
          <div className=" text-left px-3 my3">
            <h2 className="font-bold my-5">Ride</h2>
            <p className="my-2">
              Go anywhere with ValanPulse <br />
              Request a ride and go
            </p>
            <button className="bg-white rounded-xl w-[100px]">Details</button>
          </div>
          <img
            className="h-[150px] w-[150px] z-20 transform hover:scale-105 transition-transform duration-500"
            src="../images/ride.png"
            alt=""
          />
        </div>

        <div className="ride flex bg-gray-300  rounded-xl justify-evenly p-5">
          <div className=" text-left px-3 my3">
            <h2 className="font-bold my-4">Ride</h2>
            <p className="my-2">
              Go anywhere with ValanPulse <br />
              Request a ride and go
            </p>
            <button className="bg-white rounded-xl w-[100px]">Details</button>
          </div>
          <img
            className="h-[150px] w-[150px] z-20 transform hover:scale-105 transition-transform duration-500"
            src="../images/rideauto.png"
            alt=""
          />
        </div>

        <div className="ride flex bg-gray-300  rounded-xl justify-evenly p-5">
          <div className=" text-left px-3 my3">
            <h2 className="font-bold my-5">Ride</h2>
            <p className="my-2">
              Go anywhere with ValanPulse <br />
              Request a ride and go
            </p>
            <button className="bg-white rounded-xl w-[100px]">Details</button>
          </div>
          <img
            className="h-[150px] w-[150px] z-10 transform hover:scale-105 transition-transform duration-500"
            src="../images/sedan.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
