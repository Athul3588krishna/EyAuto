import { Button, Input } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function RiderDestination() {
    const navigate = useNavigate();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [activeInput, setActiveInput] = useState("");
    const [addressList, setAddressList] = useState([]);
    // const [destinationData, setDestinationData] = useState({})
  
    const handleAddressClick = (address) => {
      if (activeInput === "from") {
        setFrom(address.description);
      } else if (activeInput === "to") {
        setTo(address.description);
      }
      console.log("Address clicked:", address);
    };
  
    const handleFromChange = async (e) => {
      setFrom(e.target.value);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/maps/get-sugession",
          {
            address: e.target.value,
          },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        );
        //   console.log("document.activeElement.name:", document.activeElement.name);
        setActiveInput("from");
        //   console.log(response.data);
        setAddressList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleToChange = async (e) => {
      setTo(e.target.value);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/maps/get-sugession",
          {
            address: e.target.value,
          },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        );
        console.log("document.activeElement.name:", document.activeElement.name);
        //   console.log(response.data);
        setActiveInput("to");
        setAddressList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
  
    const handleSubmit = async () => {
      // e.preventDefault();
      if (!from || !to) {
        console.log("Please enter both from and to addresses");
        return;
      }
      try {
        const response = await axios.post(
          "http://localhost:8000/api/maps/calculate-distance",
          {
            origin: from,
            destination: to,
          },
        //   {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("token")}`,
        //     },
        //   }
        );
        console.log(response.data);
        const stats = {
          ...response.data,
          distination: { from, to },
        }
        // setDestinationData(response.data);
        navigate("/to-ride", { state: stats });
      } catch (error) {
        console.error(error);
      }
    };
  
    return (
      <>
        <div className="flex flex-col w-full gap-2 p-4">
          <Input
            label="From"
            name="from"
            value={from}
            onChange={handleFromChange}
            onClick={() => setActiveInput("from")}
          />
          <Input
            label="To"
            name="to"
            value={to}
            onChange={handleToChange}
            onClick={() => setActiveInput("to")}
          />
          <Button variant="gradient" onClick={handleSubmit}>
            Find Trip
          </Button>
        </div>
        <div className="flex flex-col w-full gap-2 p-4">
          {addressList.map((e) => (
            <div
              key={e.place_id}
              className="flex items-start border border-black p-4 pl-2 rounded-lg cursor-pointer hover:bg-gray-200"
              onClick={() => handleAddressClick(e)}
            >
              <div className="w-6 h-6 mr-2 flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                  />
                </svg>
              </div>
              <p className="text-gray-700">{e.description}</p>
            </div>
          ))}
        </div>
      </>
    );
}

export default RiderDestination