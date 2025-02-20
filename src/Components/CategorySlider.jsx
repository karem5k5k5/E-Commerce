import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import Slider from "react-slick";

export default function CategorySlider() {

    const { data } = useQuery('categories', getCategories)
    async function getCategories() {
        return await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    }
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: false,
        responsive: [
            {
                breakpoint: 1300,
                settings: { slidesToShow: 4 }
            },
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 768,
                settings: { slidesToShow: 2 }
            },
        ]
    };
    return (
        <div className="container mb-9 md:w-[95%] w-[90%] mx-auto">
            <h2 className=" text-2xl mb-3 ">Shop Popular Categories</h2>
            <Slider {...settings}>
                {data?.data.data.map((item, index) => {
                    return <div key={index}>
                        <img src={item.image} className=" w-full h-[200px]" alt={item.name} />
                        <h3 className=" text-green-600 text-center text-lg">{item.name}</h3>
                    </div>
                })}
            </Slider>
        </div>
    );
}