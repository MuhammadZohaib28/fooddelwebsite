import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets, menuItems } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, setUser, setShowUserlogin, navigate } = useAppContext();

  console.log(user, "=====USER=====");

  const logout = async () => {
    setUser(null);
    navigate("/");
  };

  return (
    <nav className=" flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white relative transition-all">
      <NavLink to={"/"}>
        <img className="h-9" src={assets.logo} alt="logo" />
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden sm:flex items-center gap-8">
        {menuItems.map(
          (i) =>
            (i.name !== "My Orders" || user) && (
              <NavLink onClick={() => setOpen(false)} to={i.to} key={i.id}>
                {i.name}
              </NavLink>
            )
        )}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-300 px-3 rounded-full">
          <input
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-500"
            type="text"
            placeholder="Search products"
          />
          <img src={assets.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <img src={assets.cart_icon} alt="cart" className="opacity-80 w-6" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-primary w-[18px] h-[18px] rounded-full">
            3
          </button>
        </div>

        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserlogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <div className="relative group cursor-pointer ">
            <img src={assets.profile_icon} className="w-10" alt="" />
            <ul className="hidden group-hover:block absolute top-10 left-0 bg-white shadow border border-primary py-2.5 w-30 rounded-md text-sm z-40">
              <li
                onClick={() => navigate("my-orders")}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                My Orders
              </li>
              <li
                onClick={logout}
                className="p-1.5 pl-3 hover:bg-primary/10 cursor-pointer"
              >
                <button
                  onClick={logout}
                  className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>

      <button
        onClick={() => (open ? setOpen(false) : setOpen(true))}
        aria-label="Menu"
        className="sm:hidden"
      >
        {/* Menu Icon SVG */}
        <img src={assets.menu_icon} alt="menu icon" />
      </button>

      {/* Mobile Menu */}

      <div
        className={`${
          open ? "flex" : "hidden"
        } absolute top-[60px] left-0 w-full bg-white shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden`}
      >
        {menuItems.map(
          (i) =>
            (i.name !== "My Orders" || user) && (
              <NavLink onClick={() => setOpen(false)} to={i.to} key={i.id}>
                {i.name}
              </NavLink>
            )
        )}

        {!user ? (
          <button
            onClick={() => {
              setOpen(false);
              setShowUserlogin(true);
            }}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 mt-2 bg-primary hover:bg-primary-dull transition text-white rounded-full text-sm"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
