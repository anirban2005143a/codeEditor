import React from 'react'
import img from "../../assets/homeBg.webp"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Features = () => {
  return (
    <div id='Features' className='bg-black border-t-[1px] border-white'>

      <section className='f1 z-20 relative flex sm:flex-row flex-col justify-center items-center py-10 px-2 '>
        <div className='visual w-[40%] md:p-10 sm:p-8 p-4 rotate-x-45 -rotate-y-[20deg] rotate-z-4'>
          <img src={img} alt="" className=' w-full object-cover rounded-xl' />
        </div>
        <div className='content w-[60%] md:p-10 sm:p-8 p-4 text-white border-l-2 '>
          <h2 class="text-4xl font-bold mb-6 text-white">Feature 1: Responsive Design</h2>
          <p class="text-white mb-8">Our website is fully responsive, ensuring a seamless experience across all devices.</p>
        </div>
      </section>

      <section className='f2 z-20 relative flex sm:flex-row-reverse flex-col justify-center items-center py-10 px-2 '>
        <div className='visual w-[40%] md:p-10 sm:p-8 p-4 '>
          <img src={img} alt="" className=' w-full object-cover rounded-xl' />
        </div>
        <div className='content w-[60%] md:p-10 sm:p-8 p-4 text-white border-r-2 '>
          <h2 class="text-4xl font-bold mb-6 text-white">Feature 1: Responsive Design</h2>
          <p class="text-white mb-8">Our website is fully responsive, ensuring a seamless experience across all devices.</p>
        </div>
      </section>

      <section className='f3 z-20 relative flex sm:flex-row flex-col justify-center items-center py-10 px-2 '>
        <div className='visual w-[40%] md:p-10 sm:p-8 p-4 '>
          <img src={img} alt="" className=' w-full object-cover rounded-xl' />
        </div>
        <div className='content w-[60%] md:p-10 sm:p-8 p-4 text-white border-l-2 '>
          <h2 class="text-4xl font-bold mb-6 text-white">Feature 1: Responsive Design</h2>
          <p class="text-white mb-8">Our website is fully responsive, ensuring a seamless experience across all devices.</p>
        </div>
      </section>

      <section className='f4 z-20 relative flex sm:flex-row-reverse flex-col justify-center items-center py-10 px-2 '>
        <div className='visual w-[40%] md:p-10 sm:p-8 p-4 '>
          <img src={img} alt="" className=' w-full object-cover rounded-xl' />
        </div>
        <div className='content w-[60%] md:p-10 sm:p-8 p-4 text-white border-r-2 '>
          <h2 class="text-4xl font-bold mb-6 text-white">Feature 1: Responsive Design</h2>
          <p class="text-white mb-8">Our website is fully responsive, ensuring a seamless experience across all devices.</p>
        </div>
      </section>

    </div>
  )
}

export default Features