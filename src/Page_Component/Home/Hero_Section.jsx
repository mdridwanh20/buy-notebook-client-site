import React from 'react';
import { Link } from 'react-router';
import img from '../../assets/hero section img.webp'
import { Btn } from '../../Components/ShareCompo/Typography';


export default function Hero_Section() {



  return (
    <section className="">

      <div className="container mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        

        {/* Text content */}
        <div className='order-2 md:order-1'>
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--deepColor)] leading-tight mb-6">
            Capture <span className='text-[var(--primaryColor)]'>Your Ideas</span> in Style
          </h1>

          <p className="text-lg text-gray-600 mb-5">
            Discover beautifully designed notebooks, planners, and stationery
            crafted to inspire your creativity and help you stay organized.
          </p>
          <div className="flex space-x-4">

            <div className='flex items-center gap-5'>

                <Btn btn={'Shop Now'}></Btn>
                <Btn className={' border border-cyan-600 text-[var(--primaryColor)]! bg-none! '} btn={'Learn More'}></Btn>

            </div>
         

          </div>
        </div>

        {/* Image */}
        <div className="flex order-1 md:order-2 justify-center">
          <img 
            src={img} 
            className="rounded-lg shadow-lg"
          />
        </div>


      </div>
    </section>
  );
}
