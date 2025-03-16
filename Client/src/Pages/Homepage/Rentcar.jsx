

const Rentcar = () => {
  return (
    <div className="container lg:mx-28">
    <div className="rentcar my-6 mx-5 lg:mx-auto flex flex-col-reverse lg:flex-row gap-6">
        <img className="h-[280px] w-[280px] lg:h-[500px] lg:w-[500px] z-10 transform hover:scale-105 transition-transform duration-300" src="../images/rent.jpg" alt="" />
        <div className="drive-text lg:my-32 lg:mx-14">
            <h1 className="text-4xl">Drive when you</h1>
            <h1 className="text-4xl">want, make what</h1>
            <h1 className="text-4xl">you need</h1>
            <p className="my-6">Make money on your schedule with deliveries or rides-or <br />
            both. YOu can use your own car or choose a rental <br />
            through Uber.</p>
            <div className="flex my-3">
            <button       className=" bg-yellow-300 text-black border-gray-900  hover:bg-gray-900 hover:text-white font-semibold px-5 py-3 text-lg rounded-full"
           >Get Started</button>
            <p className="my-3 mx-6">Already have an account ?</p>
            </div>
        </div>
    </div>
   </div>
  )
}

export default Rentcar