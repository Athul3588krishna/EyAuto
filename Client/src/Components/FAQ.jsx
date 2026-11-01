import { useState } from "react";

export default function FAQ() {
  const faqs = [
    {
      question: "Can I book an auto rickshaw anywhere in Valanchery?",
      answer:
        "Yes, EyAuto covers all major areas in and around Valanchery, including the bus stand, railway routes, clinics, colleges, and neighboring towns like Kottakkal and Kuttippuram.",
    },
    {
      question: "What are the requirements to drive with EyAuto?",
      answer:
        "You need a valid commercial or private driving license, an auto rickshaw or qualifying vehicle, and vehicle registration documents.",
    },
    {
      question: "How does fare calculation work?",
      answer:
        "Fares are calculated based on transparent government meter rates and distance estimated via OpenStreetMap routing.",
    },
    {
      question: "Is OpenStreetMap tracking live and free?",
      answer:
        "Yes, EyAuto uses OpenStreetMap and Leaflet to provide real-time route estimates and map views with zero proprietary lock-in.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 my-10">
      <h2 className="text-2xl font-extrabold text-center mb-6 text-gray-900">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-4 bg-white shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left text-base font-bold text-gray-800 focus:outline-none flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span
                className={`transition-transform duration-200 text-yellow-500 font-bold ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <p className="mt-3 text-sm text-gray-600 leading-relaxed border-t pt-3 border-gray-100">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
