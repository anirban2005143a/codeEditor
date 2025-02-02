
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useEffect } from "react";
import axios from "axios"

const AiSupport = () => {

    const sidebarRef = useRef(null);
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [prompt, setprompt] = useState(null)
    const [output, setoutput] = useState(null)

    // Function to close the sidebar
    const closeSidebar = () => {
        setprompt(null)
        gsap.to(sidebarRef.current, { x: "100%", duration: 0.5, ease: "power2.out" });
    };

    // Handle mouse down on the resize handle
    const handleMouseDown = (e) => {
        e.preventDefault();
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // Handle mouse move to resize the sidebar
    const handleMouseMove = (e) => {
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= 200 && newWidth <= 600) {
            setSidebarWidth(newWidth);
        }
    };

    // Handle mouse up to stop resizing
    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };


    return (

        <div
            ref={sidebarRef}
            style={{ width: `${sidebarWidth}px` }}
            id="AiSupport"
            className=" rounded-xl z-40 fixed top-[15vh] right-0 min-h-[50vh] max-h-[70vh] overflow-x-visible overflow-y-auto bg-gray-900 shadow-lg transform translate-x-full"
        >
            <div className=" relative w-full h-full py-15 ">

                {/* Resize handle */}
                <div
                    onMouseDown={handleMouseDown}
                    className="absolute top-0 me-2 -left-[8px] w-3 h-full cursor-ew-resize bg-gray-700 hover:bg-blue-500"
                />
                {/* Close button */}
                <button button
                    onClick={closeSidebar}
                    className=" cursor-pointer absolute font-light m-3 top-0 right-2 w-12 h-12 text-white text-4xl pb-2 rounded-full bg-slate-800 hover:bg-slate-600"
                >
                    x
                </button >

                {/* Text area */}
                <div className="p-4" >
                    <textarea
                        className="w-full h-32 p-2 bg-gray-800 text-white rounded min-h-20"
                        placeholder="Type something..."
                        value={prompt}
                        onChange={(e) => {
                            setprompt(e.target.value)
                        }}
                    />
                </div >

                {/* Send button */}
                <div className="p-4" >
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                        Ask AI
                    </button>
                </div >

                {/* output from ai  */}
                {output && output === "" && <div className="p-2 text-white rounded-2xl border-2 border-slate-700 mx-2">
                    {output}
                </div>}

            </div>
        </div >

    );
};

export default AiSupport;