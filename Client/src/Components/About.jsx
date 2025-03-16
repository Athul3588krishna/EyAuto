import Navbar from "../Pages/Homepage/Navbar";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-section mx-6 md:mx-36 py-10">
        <div className="about-container">
          {/* Header Section */}
          <div className="about-header text-center">
            <h1 className="text-4xl md:text-5xl font-semibold">
              VARAS: Revolutionizing Auto Rickshaw Booking
            </h1>
            <p className="my-5 text-gray-500 text-lg">
              Enhancing urban mobility with seamless and efficient ride-booking solutions.
            </p>
            <button className="bg-black h-[50px] md:h-[60px] w-[160px] md:w-[180px] rounded-xl text-white text-lg md:text-xl transition hover:bg-gray-800">
              Explore the Platform
            </button>
          </div>

          {/* Details Section */}
          <div className="about-details mt-12">
            <h1 className="text-2xl md:text-3xl font-semibold">
              About VARAS: Smart Mobility for Everyone
            </h1>
            <div className="about-para flex flex-col md:flex-row gap-8 mt-6">
              <p className="md:w-1/2 text-gray-700 text-lg leading-relaxed">
                VARAS (Valanchery Auto-Rickshaw Automation System) is a technology-driven solution designed to streamline the process of booking auto-rickshaws. It provides a seamless experience for passengers and empowers drivers by ensuring efficient ride allocation.
              </p>
              <p className="md:w-1/2 text-gray-700 text-lg leading-relaxed">
                With VARAS, users can easily book rides, estimate fares, and connect with available drivers in real-time. Our platform is built to improve urban transportation by reducing wait times, optimizing routes, and enhancing passenger convenience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
