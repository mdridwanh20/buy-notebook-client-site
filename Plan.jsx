import React from "react";
import { FaBusinessTime, FaGlobe, FaRocket } from "react-icons/fa";
import { MdSchool } from "react-icons/md";
import { AiOutlineCheck } from "react-icons/ai"; // ✔️ icon
import { IoCheckmarkDoneOutline } from "react-icons/io5";

export default function Plan() {
  const slides = [
    {
      slide: "Slide 1",
      title: "September – Offline Goals",
      icon: <FaBusinessTime className="text-3xl text-teal-600" />,
      items: ["Start local business (Paper Binding)", "Create Facebook page"],
      gradient: "from-teal-500 to-green-400",
    },
    {
      slide: "Slide 2",
      title: "September – Online Goals",
      icon: <FaGlobe className="text-3xl text-indigo-600" />,
      items: [
        "Build 2 websites (React Full Stack)",
        "Get Upwork membership",
        "Start YouTube: Basic JS videos",
        "Update LinkedIn posts",
      ],
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      slide: "Slide 3",
      title: "October – Offline Goals",
      icon: <FaRocket className="text-3xl text-pink-600" />,
      items: ["Grow local business", "Update Facebook page", "Plan new website"],
      gradient: "from-pink-500 to-red-400",
    },
    {
      slide: "Slide 4",
      title: "October – Online Goals",
      icon: <MdSchool className="text-3xl text-yellow-600" />,
      items: [
        "Enroll Course in PH Level 02 ",
        "Continue Upwork membership",
        "JS Advanced topics (upload to YouTube)",
        "Update LinkedIn posts",
        "Update English YouTube channel",
      ],
      gradient: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="max-w-6xl py-30 p-20 m-auto">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        📌 Business Goals (September & October)
      </h1>

      <div className="grid md:grid-cols-2 gap-15">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-2xl shadow-lg bg-gradient-to-r ${slide.gradient} text-white transition transform hover:scale-105`}
          >
            {/* Pin-style Icon Badge */}
            <div className="absolute -top-10 transform -translate-x-1/2 flex flex-col items-center">
              <div className="bg-white rounded-full p-4 shadow-md border-2 border-gray-200">
                {slide.icon}
              </div>
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-700"></div>
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8 text-white drop-shadow-md">
              {slide.title}
            </h2>

            <ul className="list-none pl-0 space-y-2">
              {slide.items.map((item, i) => (
                <li key={i} className="text-lg font-medium flex items-center gap-2">
                  <IoCheckmarkDoneOutline className="text-white" /> {/* ✔️ icon */}
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
