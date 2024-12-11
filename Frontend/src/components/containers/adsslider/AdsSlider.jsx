import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const AdsSlider = () => {
  const ads = [
    { id: 1, src: "/marketplace/bannerexample.png", alt: "Ad 1" },
    { id: 2, src: "/marketplace/bannerexample.png", alt: "Ad 2" },
    { id: 3, src: "/marketplace/bannerexample.png", alt: "Ad 3" },
    { id: 4, src: "/marketplace/bannerexample.png", alt: "Ad 4" },
  ];

  return (
    <div className="w-[80vw] h-full py-10 mx-auto">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {ads.map((ad) => (
          <SwiperSlide key={ad.id}>
            <img
              src={ad.src}
              alt={ad.alt}
              className="w-[80vw] h-full object-cover rounded-md shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default AdsSlider;