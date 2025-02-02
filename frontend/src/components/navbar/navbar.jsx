import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo.png"

const Navbar = (props) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomId, setroomId] = useState("");
  const [inroomId, setinroomId] = useState("");
  const [check, setCheck] = useState("");
  const navigate = useNavigate();

  const getRoomId = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const id = `${getRandomChar()}${getRandomChar()}${getRandomChar()}-${getRandomChar()}${getRandomChar()}${getRandomChar()}-${getRandomChar()}${getRandomChar()}${getRandomChar()}`;
    console.log(id);
    setroomId(id);
  };

  const handleCollaborateClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCheck("");
    setroomId("");
    setinroomId("");
  };

  const handleCreateRoom = () => {
    setCheck("create");
    console.log("Create Room clicked");
    getRoomId();
  };

  const handleEnterRoom = () => {
    setCheck("enter");
    console.log("Enter Room clicked");
  };

  useEffect(() => {
    isModalOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"
  }, [isModalOpen])

  return (
    <>
      <nav id="navbar" className="fixed top-0 left-0 w-full z-50 border-gray-200 ">

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className=" cursor-pointer flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src={logo}
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Code Editor
            </span>
          </Link>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-user"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  ">

              <li>
                <Link to="/" className={`block py-2 px-3 ${window.location.pathname === "/" ? " md:dark:text-blue-500 md:text-blue-700 " : " text-white "} rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer`}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className={`block py-2 px-3 ${window.location.pathname === "/about" ? " md:dark:text-blue-500 md:text-blue-700 " : " text-white "} rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer`}>
                  About
                </Link>
              </li>
              {window.location.pathname !== "/editor" && <li>
                <a
                  onClick={handleCollaborateClick}
                  className={`block py-2 px-3 ${window.location.pathname === "/collab" ? " md:dark:text-blue-500 md:text-blue-700 " : " text-white "} rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer`}>
                  Collaborate
                </a>
              </li>}
              <li>
                <Link to="/editor" className={`block py-2 px-3 ${window.location.pathname === "/editor" ? " md:dark:text-blue-500 md:text-blue-700 " : " text-white "} rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0  md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 cursor-pointer`}>
                  Editor
                </Link>
              </li>

            </ul>
          </div>
        </div>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-[5px] bg-[#2020236b] z-50">
          <div className="bg-[#4b5563] p-8 rounded-lg shadow-2xl md:w-[600px] w-[97%] transform transition-all duration-300 ease-in-out hover:scale-100">
            <div className="flex justify-end">

              <button
                onClick={handleCloseModal}
                className="h-10 w-10 cursor-pointer text-white text-center rounded-full hover:bg-gray-700 transition-colors duration-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="h-6 w-6 mx-auto"
                >
                  <path
                    fill="currentColor"
                    d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  />
                </svg>
              </button>
            </div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold text-white">Collaborate</h2>
            </div>

            <div className="flex justify-center gap-12 mt-5 mb-8">
              <button type="button"
                onClick={handleCreateRoom}
                className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Generate a Room Id
              </button>
              <button type="button"
                onClick={handleEnterRoom}
                className="text-white cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                Enter a Room Id
              </button>
            </div>

            <div className="text-center">
              {check === "create" ? (
                <>
                  <div className="text-white font-bold text-2xl mb-4">
                    Room ID: {roomId}
                  </div>
                  <div className="flex justify-center items-center gap-12 h-full mt-4 cursor-pointer">
                    <div className=" p-[4px] rounded-[16px]">
                      <button
                        onClick={() => {
                          navigate(`/editor?${roomId}`);
                        }}
                        type="button"
                        className="text-white cursor-pointer bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                        Enter the Room
                      </button>
                    </div>
                  </div>
                </>
              ) : check === "enter" ? (
                <div className="flex flex-col items-center gap-4">

                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      console.log(roomId.length, roomId)
                      if (roomId.length === 11) {
                        navigate(`/editor?${roomId}`)
                      } else {
                        toast.error('Enter Valid room id', {
                          position: "top-right",
                          autoClose: 5000,
                          hideProgressBar: false,
                          closeOnClick: false,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "dark",
                        });
                      }
                    }}
                    className="flex flex-col justify-center items-center max-w-sm mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                        </svg>
                      </div>
                      <input type="text" autoComplete="off" onChange={(e) => {
                        setroomId(e.target.value)
                      }} id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search branch name..." required />
                    </div>
                    <button type="submit"
                      className=" m-3 cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                      Join Room
                    </button>
                  </form>
                </div>
              ) : null}
            </div>
          </div>
          <ToastContainer />
        </div>
      )}

    </>
  );
};

export default Navbar;
