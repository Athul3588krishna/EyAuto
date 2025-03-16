



import About from "../../Components/About"
import Destine from "../Destination/Destine"
// import FAQ from "../../Components/Faq"
import Options from "../Login/Options"
import Navbaaar from "../Navbaaar"
import RegistrationForm from "../Registration/RegistrationForm"

import Banner from "./Banner"
import Bannerform from "./Bannerform"
import Drivehompage from "./Drivehompage"

import Rentcar from "./Rentcar"
import Suggestions from "./Suggestions"
import Valanbusiness from "./Valanbusiness"


function Home() {
  return (
    <div>
      
        {/* <Navbar/> */}
   
    <Banner/>
   
   
     
     <Drivehompage/>
     <Valanbusiness/>
     <Rentcar/>
     {/* <Options/> */}
    
     {/* <Drive/> */}
     {/* <Footer/> */}
     
     
     
    </div>
  )
}

export default Home
