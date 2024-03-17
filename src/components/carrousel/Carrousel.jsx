/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { useHistory } from "../../HistoryContext";
import { carrouselMockData } from "../../data/carrouselMockData";

import { storeData } from "../../utils";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./carrousel.css";

import { EffectCoverflow, Pagination, Navigation } from "swiper";

export const Carrousel = ({ images }) => {
  const [activeId, setActiveId] = useState(null);
  const { addToHistory, historyData } = useHistory();
  const swiperRef = useRef(null);

const handleButtonClick = () => {
    const activeItem = carrouselMockData.find((item) => item.id === activeId);
    if (activeItem && !historyData.some((item) => item.id === activeItem.id)) {
        addToHistory(activeItem);
        storeData("cachedData", [...historyData, activeItem]);
        console.log("ActiveItem added", activeItem);
    } else {
        console.log("Item already exists in historyData");
    }
};

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = swiperRef.current.swiper;

      const handleSlideChange = () => {
        const activeSlideId = images[swiper.realIndex].id;
        setActiveId(activeSlideId);
        console.log("ActiveSlide ID", activeSlideId);
      };

      swiper.on("slideChange", handleSlideChange);

      return () => {
        swiper.off("slideChange", handleSlideChange);
      };
    }
  }, [images]);

  return (
    <>
      <div className="container">
        <Swiper
          ref={swiperRef}
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: ".swiper-pagination", clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          {images.map((image) => (
            <SwiperSlide key={image.id}>
              <img src={image.url} alt="slide_image" />
            </SwiperSlide>
          ))}

          <div className="slider-controler">
            <div className="swiper-pagination"></div>
          </div>
        </Swiper>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button className="btn btn-primary m-3" onClick={handleButtonClick}>
          Get Course
        </button>
      </div>
    </>
  );
};
