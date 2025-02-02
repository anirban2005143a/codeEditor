import React, { useEffect, useRef } from 'react'
import img from "../../assets/homeBg.webp"
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const Features = () => {

  const featureImgRef1 = useRef(null)
  const featureImgRef2 = useRef(null)
  const featureImgRef3 = useRef(null)
  const featureImgRef4 = useRef(null)

  const animateFeatureImgEnter = (e) => {
    const element = e.target
    gsap.to(element, {
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      duration: 2,
      ease: "elastic.out(1,0.5)"
    })
  }
  const animateFeatureImgOut = (element, x, y, z) => {
    console.log(x, y, z)
    gsap.to(element, {
      rotateX: `${x}deg`,
      rotateY: `${y}deg`,
      rotateZ: `${z}deg`,
      duration: 2,
      ease: "elastic.out(1,0.5)"
    })
    console.log(element)
  }


  return (
    <div id='Features' className='bg-black border-t-[1px] border-white perspective-[1000px]'>

      <section className='f1 relative flex md:flex-row flex-col justify-center items-center py-10 px-2 '>
        <div className='visual md:w-[40%] w-full md:p-10 sm:p-8 p-4 '>
          <img
            // onMouseOver={(e) => {
            //   // animateFeatureImgEnter(e)
            //   e.target.classList.remove("rotate-x-[45deg]")
            //   e.target.classList.remove("-rotate-y-[20deg]")
            //   e.target.classList.remove("rotate-z-[4deg]")
            //   console.log("fgreg")
            // }} onMouseOut={(e) => {
            //   // animateFeatureImgOut(e.target, 45, -20, -4)
            //   e.target.classList.add("rotate-x-[45deg]")
            //   e.target.classList.add("-rotate-y-[20deg]")
            //   e.target.classList.add("rotate-z-[4deg]")
            // }}
            src={img} alt="" className=' transition-all duration-150 ease-in-out w-full object-cover rounded-xl ' style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -10px, rgba(145, 143, 142, 0.3) 0px 5px 60px 0px" }} />
        </div>
        <div className='content md:w-[60%] w-full md:p-10 sm:p-8 p-4 text-white md:border-l-2  md:border-t-0  border-t-2 '>
          <h2 className="text-4xl font-bold mb-6 text-white">Lightweight & Feature-Rich Editing</h2>
          <p className="text-white mb-8">
            The editor integrates a lightweight yet powerful code editing environment with syntax highlighting, multiple themes, word wrap, line numbering, bracket matching, automatic indentation, and a file explorer for seamless navigation.
          </p>
        </div>
      </section>

      <section className='f2 z-20 relative flex sm:flex-row-reverse flex-col justify-center items-center py-10 px-2'>
        <div className='visual md:w-[40%] w-full md:p-10 sm:p-8 p-4 '>
          <img
            src={img} alt="" className=' transition-all duration-150 ease-in-out w-full object-cover rounded-xl ' style={{ boxShadow: "rgba(50, 50, 93, 0.25) 0px 50px 100px -10px, rgba(145, 143, 142, 0.3) 0px 5px 60px 0px" }} />
        </div>
        <div className=' content md:w-[60%] w-full md:p-10 sm:p-8 p-4 text-white md:border-r-2 border-t-2  md:border-t-0 '>
          <h2 className="text-4xl font-bold mb-6 text-white">Multi-User Editing with Live Cursor Tracking</h2>
          <p className="text-white mb-8">Enables multiple developers to work simultaneously on the same codebase with real-time cursor positioning, in-editor comments for discussions, an activity log for tracking changes, and basic version control with auto-save and undo/redo functionality.</p>
        </div>
      </section>


      <section className='f3 z-20 relative flex sm:flex-row flex-col justify-center items-center py-10 px-2 '>
        <div className='visual md:w-[40%] w-full md:p-10 sm:p-8 p-4 '>
          <img src={img} alt="" className=' w-full object-cover rounded-xl' />
        </div>
        <div className='content md:w-[60%] w-full md:p-10 sm:p-8 p-4 text-white md:border-l-2  md:border-t-0 border-t-2 '>
          <h2 className="text-4xl font-bold mb-6 text-white">Secure Access & Data Protection:</h2>
          <p className="text-white mb-8"> Implements email and Google OAuth login, supports two-factor authentication (2FA) via OTP or TOTP, provides private and public workspaces for controlled access, and includes password reset functionality to ensure secure user authentication.</p>
        </div>
      </section>

      <section className='f4 z-20 relative flex sm:flex-row-reverse flex-col justify-center items-center py-10 px-2 '>
        <div className='visual md:w-[40%] w-full md:p-10 sm:p-8 p-4 '>
          <img src={img} alt="" className=' w-full object-cover rounded-xl' />
        </div>
        <div className='content md:w-[60%] w-full md:p-10 sm:p-8 p-4 text-white md:border-r-2 md:border-t-0 border-t-2 '>
          <h2 className="text-4xl font-bold mb-6 text-white">Customizable & Efficient UI</h2>
          <p className="text-white mb-8"> Offers dark and light mode toggles for better visual comfort, a collapsible sidebar to maximize coding workspace, and a simple, intuitive interface with customizable font sizes and color themes for an enhanced user experience.</p>
        </div>
      </section>

    </div>
  )
}

export default Features