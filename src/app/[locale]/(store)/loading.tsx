import React from "react";
import loading from "@/public/assets/images/swiper/loader.gif";

export default function Loading() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <img
        src="/assets/images/swiper/loader.gif"
        alt="Loading..."
        className=" h-1/3"
      />
    </div>
  );
}
