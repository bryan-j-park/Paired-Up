import React from "react";
import NavBar from '../components/NavBar';
import TrendingProduct from "../components/TrendingProducts";
import Incentives from "../components/Incentives";
import Footer from '../components/Footer';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade } from 'swiper';
import { Pagination, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import wide1 from '../images/carousel/wide1.jpg';
import wide2 from '../images/carousel/wide2.jpg';
import wide3 from '../images/carousel/wide3.jpg';
import wide4 from '../images/carousel/wide4.jpg';
import wide5 from '../images/carousel/wide5.jpg';
import wide6 from '../images/carousel/wide6.jpg';

const Home = () => {

    const carousel = [
        { img: wide1, alt: '' },
        // { img: wide2, alt: '' },
        { img: wide3, alt: '' },
        { img: wide4, alt: '' },
        { img: wide5, alt: '' },
        { img: wide6, alt: '' },
    ];

    return (
        <div>
            <NavBar/>

            <div className="w-full mx-auto relative">
                <Swiper
                effect="fade"
                className="max-h-min"
                loop={true} 
                autoplay={{
                    delay:5000,
                }}
                modules={[EffectFade, Pagination, Autoplay]}>
                    {carousel.map((images, i) => {
                        return (
                            <SwiperSlide key={i}
                            >
                                <img src={images.img} alt={images.alt}/>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
                {/* <h1 className="z-1000 absolute text-6xl text-black mx-auto font-fugaz">ONE STEP AT A TIME</h1> */}
            </div>

            <TrendingProduct />
            <Incentives />
            <Footer />
        </div>
    );
}

export default Home;