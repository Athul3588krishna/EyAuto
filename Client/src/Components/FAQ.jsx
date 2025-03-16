import  { useState } from "react";

const faqs = [
  { question: "Can I drive with ValanPulse in my city?", answer: "Yes, ValanPulse operates in various cities. Check the availability in your location on the ValanPulse website." },
  { question: "What are the requirements to drive with ValanPulse?", answer: "You need a valid driver’s license, a qualifying vehicle, and to meet the age requirement for your city." },
  { question: "Is the ValanPulse platform safe?", answer: "ValanPulse implements safety measures like GPS tracking, driver screenings, and a support team to ensure safety." },
  { question: "Do I need my own car?", answer: "Not necessarily. In some cities, you can rent a car through ValanPulse’s partner programs." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold  mb-6">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 pb-4">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-lg font-medium  focus:outline-none flex justify-between items-center"
            >
              {faq.question}
              <span className={`transition-transform ${openIndex === index ? "rotate-180" : ""}`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-2 ">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
