import { useState } from "react";
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { MdHome, MdInfo, MdEmail } from "react-icons/md";
import { LuLayoutDashboard } from "react-icons/lu";
import logo from "../assets/logo.png";



export default function Navbar() {
  const [nav, setNav] = useState(true);

  function handleNav() {
    setNav(!nav);
  }
  return (
    <>
    <div className="flex flex-row justify-between bg-gray-300">
    
    <div className="flex justify-between basis=1/4 items-end max-w-[40px] mx-auto px-4">
    <Link  to="/">
        <h1 className=" text-[45px] text-[#4f99c6] " alt="logo">CS415</h1>
       
    </Link>
    </div>
      <div className="flex flex-row-reverse justify-between basis-3/4 items-end h-24 max-w-[1240px] mx-auto px-4 text-white ">
      {/* Menu bar full Screen */}
     
      <ul className="hidden md:flex ">
        <li className="text-[#4f99c6] p-4 hover:scale-110 duration-200 flex justify-between items-center gap-1">
          <MdHome size={20} /> <Link to="/">Home</Link>
        </li>
        <li className="text-[#4f99c6] p-4 hover:scale-110 duration-200 flex justify-between items-center gap-1">
          <MdInfo size={20} />
          <Link to="/userprofile">Profile</Link>
        </li>
        <li className="text-[#4f99c6] p-4 hover:scale-110 duration-200 flex justify-between items-center gap-1">
          <LuLayoutDashboard size={20} /> <Link to="/Dashboard">Dashboard</Link>
        </li>
      </ul>
      {/* Drop down Menu Bar */}
      <div onClick={handleNav} className="block md:hidden">
        {!nav ? (
          <AiOutlineClose size={20} className=" text-[#48D1CC] z-[2000]" />
        ) : (
          <AiOutlineMenu size={20} className=" text-[#48D1CC] z-[2000]" />
        )}
      </div>
      <div
        className={
          !nav
            ? "fixed left-0 top-0 w-[80%] z-[1000] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500 md:hidden"
            : "fixed left-[-100%] "
        }
      >
        <img
          src={logo}
          alt="logo"
          className=" flex items-center justify-center w-[90px] h-[90px]"
        />
        <ul className="p-4 uppercase">
          <li className="flex justify-center text-[#48D1CC] items-center gap-1 p-4 border-b border-gray-600 hover:scale-110 duration-200">
            <MdHome size={20} />
            <Link to="/">Home</Link>
          </li>
          <li className="flex justify-center text-[#48D1CC] items-center gap-1 p-4 border-b border-gray-600 hover:scale-110 duration-200">
            <MdInfo size={20} />
            <Link to="/About">About</Link>
          </li>
          <li className="flex justify-center text-[#48D1CC] items-center gap-1 p-4 border-b border-gray-600 hover:scale-110 duration-200">
            <LuLayoutDashboard size={20} />{" "}
            <Link to="/Dashboard">Dashboard</Link>
          </li>
          <li className="flex justify-center text-[#48D1CC] items-center gap-1 p-4 hover:scale-110 duration-200">
            <MdEmail size={20} /> <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </div>
    </div>
    </div>
     
   
      {/* <div className="fixed z-50 top-0 w-full bg-white">
        <nav className="container flex justify-end items-end z-20 py-6">
          <div className="hidden lg:block gap-4 text-md text-blue-400">
            {navItems.map((navItem, index) => (
              <Link
              className="mx-3 py-5 hover:animate-jump-out "
                key={navItem}
                to={navRoutes[index]}
                
              >
                {navItem}
              </Link>
            ))}
          </div>

         

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden focus:outline-none"
          >
            <img
              className={`${isOpen && "hidden"}`}
              src="/icons/icon-hamburger.svg"
              alt=""
            />
            <img
              className={isOpen ? "block" : "hidden"}
              src="/icons/icon-close.svg"
              alt=""
            />
          </button>
        </nav>
      </div>

      {/* Modal */}
      {/* <div
        className={`fixed inset-0 z-30 bg-gray-800 bg-opacity-50 ${isOpen ? "block" : "hidden"}`}
      >
        <div className="flex items-center justify-center gap-2 bg-white text-primary-dark-blue flex-col text-center mx-5 my-20 py-4 rounded">
          {navItems.map((navItem, index) => (
            <Link key={navItem} to={navRoutes[index]} className="py-2 hover:animate-jump-out">
              {navItem}
            </Link>
          ))}
        </div>
      </div> */} 
    </>
  );
}
