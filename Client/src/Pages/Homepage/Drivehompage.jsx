const Drivehompage = () => {
  return (
    <div className="container mx-5 lg:mx-10">
      <div className="drivesection my-14 flex flex-col-reverse lg:flex-row gap-6 lg:mx-28">
        <img
          className="z-10 transform hover:scale-105 transition-transform duration-300 rounded-lg"
          src="../images/car.jpg"
          alt=""
        />
        <div className=" drive-text lg:mx-20">
          <h1 className="text-4xl">Drive when you</h1>
          <h1 className="text-4xl ">want, make what</h1>
          <h1 className="text-4xl ">you need</h1>
          <p className="my-6">
            Make money on your schedule with deliveries or rides-or both. YOu
            can use your own car or choose a rental <br />
            through Uber.
          </p>
          <div className="flex my-3">
            <button className=" bg-yellow-300 text-black border-gray-900  hover:bg-gray-900 hover:text-white font-semibold px-5 py-3 text-lg rounded-full">
              Get Started
            </button>
            <p className="my-3 mx-6">Already have an account ?</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drivehompage;
