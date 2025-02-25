"use client";

import AwesomeSlider from "react-awesome-slider";
import withAutoplay from "react-awesome-slider/dist/autoplay";
import "react-awesome-slider/dist/styles.css";
import Image from "next/image";
import { useTranslations } from "next-intl";

const AutoplaySlider = withAutoplay(AwesomeSlider);

export default function HomeMainSwiper() {
  const t = useTranslations();
  return (
    <div className="relative w-full overflow-hidden">
      {/* Ensure no overflow */}
      <AutoplaySlider
        animation="cubeAnimation"
        bullets={false}
        play={true}
        cancelOnInteraction={false}
        interval={6000}
        style={{
          border: "none",
          padding: 0,
          overflow: "hidden",
          height: "60vh",
        }} // Reduced height
      >
        {images.map((img) => (
          <div key={img.id} className="relative w-full h-full overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>{" "}
            {/* Shadow effect */}
            <Image
              src={img.url}
              alt="Banner Image"
              width={1920}
              height={1080}
              className="w-full h-full object-cover shadow-lg" // Added shadow
            />
            {/* Centered Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center text-center z-10 px-4">
              <button className="bg-[#05568C] text-white px-6 rounded-full text-sm mb-4 hover:bg-[#04466D] transition font-semibold">
                {t("Unleash the Power of Your Ride")}
              </button>
              <h4 className="text-white text-3xl sm:text-3xl max-w-xl font-extrabold">
                {t("Find the Perfect Fit for Your Vehicle")}
              </h4>
              <p className="text-white text-sm sm:text-lg leading-tight mb-3 font-semibold">
                {t(
                  "Explore a vast selection of high-quality car parts, accessories, and upgrades for every make and model"
                )}
              </p>
            </div>
          </div>
        ))}
      </AutoplaySlider>
    </div>
  );
}

const images = [
  { id: 1, url: "/assets/images/swiper/banner.png" },
  { id: 2, url: "/assets/images/swiper/banner1.png" },
  { id: 3, url: "/assets/images/swiper/banner2.png" },
];
