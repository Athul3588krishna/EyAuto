import Footer from "../Pages/Homepage/Footer";
import Navbar from "../Pages/Homepage/Navbar";
import FAQ from "./FAQ";

const Drive = () => {
  return (
    <div className="drive-section">
      <Navbar />
      <div className="drive-banner px-20 flex my-10">
        <div className="banner-text mx-40">
          <h1 className="text-4xl">
            Drive when you <br />
            want, make what <br />
            you need
          </h1>
          <p className="my-6">Earn your own schedule</p>
          <div className="flex-button flex">
            <button className="bg-yellow-300 text-black border-gray-900 hover:bg-gray-900 hover:text-white font-semibold px-5 py-3 text-lg rounded-full">
              Get Started
            </button>
            <h1 className="mx-5 my-3">Already have an account ? Sign in</h1>
          </div>
        </div>

        <div className="banner-img">
          <img
            className="h-[300px] w-[300px]"
            src="/images/driver.png"
            alt="Driver"
          />
        </div>
      </div>

      <div className="for-drivers">
        <h1 className="text-center text-4xl">Why drive with us</h1>
        <img
          className="items-center mx-auto justify-center w-[600px] h-[350px] my-8"
          src="/images/driving.png"
          alt="Driving"
        />
      </div>

      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl mb-6">Here&apos;s what you need to sign up</h1>

        <div className="flex space-x-6 border-b">
          <button className="px-4 py-2 border-b-2 border-black font-medium">
            To drive
          </button>
          <button className="px-4 py-2 text-gray-500">To deliver</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-semibold ml-2">Requirements</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Be at least 18 years old</li>
              <li>Clear a background screening</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-semibold ml-2">Documents</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Valid driver&apos;s license (private or commercial)</li>
              <li>Proof of residency in your city, state, or province</li>
              <li>Vehicle registration certificate & permit</li>
            </ul>
          </div>

          <div>
            <div className="flex items-center mb-4">
              <h2 className="text-lg font-semibold ml-2">Signup process</h2>
            </div>
            <ul className="list-disc list-inside text-gray-700">
              <li>Visit the nearest EyAuto Center or Register Online</li>
              <li>Submit documents and vehicle details</li>
              <li>Quick verification and start driving</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="fleet-partners flex text-left gap-11 my-5 justify-evenly">
        <div className="first-fleet">
          <img
            className="h-[250px] w-[500px] rounded-lg"
            src="/images/partner.png"
            alt="Partner"
          />
          <h1 className="text-xl font-bold mt-2">Join a fleet</h1>
          <p>Find and join a fleet partner and start driving for them.</p>
        </div>
        <div className="second-fleet">
          <img
            className="h-[250px] w-[500px] rounded-lg"
            src="/images/anotherpartner.png"
            alt="Fleet"
          />
          <h1 className="text-xl font-bold mt-2">Become a fleet</h1>
          <p>
            Start making money. Connect your drivers and manage vehicles on your
            profile.
          </p>
        </div>
      </div>

      <FAQ />
      <Footer />
    </div>
  );
};

export default Drive;
