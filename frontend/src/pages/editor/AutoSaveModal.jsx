import { useState } from "react";

const AutoSaveModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-center  bg-gray-100">
            {/* Button to Open Modal */}
            <button
            id="saveCodeModal"
                className="px-4 py-2 hidden bg-blue-600 text-white rounded-md"
                onClick={() => {
                    document.body.style.overflow = "hidden"
                    setIsOpen(true)
                }}
            >
                Open Modal
            </button>

            {/* Modal (Only visible when `isOpen` is true) */}
            {isOpen && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-[#22232443] backdrop-blur-sm bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Modal Title</h2>
                        <p className="text-gray-600">This is a simple modal example.</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-gray-400 text-white rounded-md"
                                onClick={() => {
                                    document.body.style.overflow = "auto"
                                    setIsOpen(false)
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AutoSaveModal;
