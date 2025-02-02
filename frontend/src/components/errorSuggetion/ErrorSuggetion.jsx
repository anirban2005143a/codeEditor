
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useEffect } from "react";
import axios from "axios"

const ErrorSuggestion = () => {

    const sidebarRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(300);
    const [Code, setCode] = useState(null)
    const [output, setoutput] = useState(null)

    // Function to close the sidebar
    const closeSidebar = () => {
        setCode(null)
        gsap.to(sidebarRef.current, { x: "100%", duration: 0.5, ease: "power2.out" });
    };

    // Handle mouse down on the resize handle
    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    // Handle mouse move to resize the sidebar
    const handleMouseMove = (e) => {
        console.log("dfvfbvg")
        const newWidth = window.innerWidth - e.clientX;
        if (newWidth >= 200 && newWidth <= 600) {
            setSidebarWidth(newWidth);
        }
        console.log(newWidth)
    };

    // Handle mouse up to stop resizing
    const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
    };

    //get error suggetion
    const getSuggetion = async () => {

        toast.success("Answer is generating, wait...");
        try {
            const data = {
                contents: [
                    {
                        role: "developer",
                        parts: [
                            {
                                text: "you are excelent in coding . Your task is to Find the error in the provided code and send the correct code making edited portion bold or highlighted . Don't send any other any comments except the correct code .",
                            },
                        ],
                    },
                    {
                        role: "user",
                        parts: [
                            {
                                text: `my code is - ${Code} 
                                        Please find the error in the code and send the correct code without comments to me.`,
                            },
                        ],
                    },
                ],
            };

            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCwQO4zmsvP9KEpgYxl4bDD8reOqgE_dcA`,
                data
            );

            if (!response) {
                console.log("Having error in getting AI data");
                toast.error("Having error in getting AI data");
                return;
            }

            const aiResponse = response.data.candidates[0].content.parts[0].text;
            console.log(aiResponse);
        } catch (error) {
            console.log(error);
            console.log(
                "Having error while getting data " +
                `error?.response?.data?.error?.message`
            );
            toast.error(
                `Something went wrong ${error?.response?.data?.error?.message}`
            );
        }

    };


    return (

        <div
            ref={sidebarRef}
            style={{ width: `${sidebarWidth}px` }}
            id="ErrorSuggetion"
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
                        value={Code}
                        onChange={(e) => {
                            setCode(e.target.value)
                        }}
                        readOnly
                    />
                </div >

                {/* Send button */}
                <div className="p-4" >
                    <button className="w-full bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">
                        Find Error
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

export default ErrorSuggestion;