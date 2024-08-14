import React from 'react';
import { Slider } from '../../components/Slider/Slider.jsx';
import { FeaturedProducts } from '../../components/FeaturedProducts/FeaturedProducts.jsx';
import { Categories } from '../../components/Categories/Categories.jsx';
import { Contact } from '../../components/Contact/Contact.jsx';
import './Home.scss';

export function Home() {
    return (
        <>
            <div className='home'>
                <Slider />
                <FeaturedProducts type="Featured" />
                <Categories />
                <FeaturedProducts type="Trending" />
                <Contact />
            </div>
        </>
    )
};