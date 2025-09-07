import React from "react";

const Trusted_Brands = () => {
  const companyLogos = [
    "slack",
    "framer",
    "netflix",
    "google",
    "linkedin",
    "instagram",
    "facebook",
  ];

  return (
    <>

      <style>{`
        .marquee-inner {
          display: flex;
          width: max-content;
          animation: marqueeScroll 25s linear infinite;
        }

        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div className="overflow-hidden w-full py-16  relative  mx-auto select-none">
        {/* Left gradient fade */}
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r " />

        {/* Scrolling container */}
        <div className="marquee-inner">
          {[...companyLogos, ...companyLogos].map((company, index) => (
            <img
              key={index}
              src={`https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/companyLogo/${company}.svg`}
              alt={company}
              className="h-12 mx-6 object-contain"
              draggable={false}
            />
          ))}
        </div>

        {/* Right gradient fade */}
        <div className="absolute right-0 top-0 h-full w-20 md:w-40 z-10 pointer-events-none bg-gradient-to-l " />
      </div>

    </>
  );
};

export default Trusted_Brands;
