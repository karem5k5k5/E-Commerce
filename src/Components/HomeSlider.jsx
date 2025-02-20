import React from "react";
import Slider from "react-slick";
import sliderImg1 from "../assets/slider-image-1.jpeg"
import sliderImg2 from "../assets/slider-image-2.jpeg"
import sliderImg3 from "../assets/slider-image-3.jpeg"
import sliderImg4 from "../assets/slider-2.jpeg"

export default function HomeSlider() {
    var settings = {
        dots: true,
        arrows: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true , 
        autoplaySpeed : 2500 
       
    };
    return (
        <div className=" py-7 mb-5">
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center">
                <div className=" md:w-2/3 w-[90%]">
                    <Slider {...settings}>
                        <picture>
                            <img src={sliderImg3} className=" w-full h-[400px]" alt="slider image" />
                        </picture>
                        <picture>
                            <img src={sliderImg2} className=" w-full h-[400px]" alt="slider image" />
                        </picture>
                    </Slider>
                </div>
                <div className=" md:w-1/3 md:block w-[90%] flex container mx-auto mt-9 md:mt-0 md:translate-y-[-3.5px]">
                    <img src={sliderImg1} className=" w-1/2 md:w-full h-[200px]" alt="slider image" />
                    <img src={sliderImg4} className=" w-1/2 md:w-full h-[200px]" alt="slider image" />
                </div>
            </div>
        </div>
    );
}
