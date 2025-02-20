import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/freshcart-logo.svg"
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { token, setToken } = useContext(AuthContext);

  const { numOfItems } = useContext(CartContext)

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }


  return (
    <nav className="bg-gray-100 border-b border-gray-200 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl font-bold"
            >
              <img src={logo} alt="" />
            </NavLink>
          </div>

          {/* Desktop Links */}
          {token ? <div className="hidden ms-3 lg:flex space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-semibold"
                  : "text-gray-700 hover:text-green-500 transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-semibold"
                  : "text-gray-700 hover:text-green-500 transition"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-semibold"
                  : "text-gray-700 hover:text-green-500 transition"
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/brands"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-semibold"
                  : "text-gray-700 hover:text-green-500 transition"
              }
            >
              Brands
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-semibold"
                  : "text-gray-700 hover:text-green-500 transition"
              }
            >
              <div className="relative">Cart <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 border-2 border-white rounded-full -top-4 -end-4">{numOfItems}</div></div>
            </NavLink>
            <NavLink
              to="/allorders"
              className={({ isActive }) =>
                isActive
                  ? "text-green-500 font-semibold"
                  : "text-gray-700 hover:text-green-500 transition"
              }
            >
              All Orders
            </NavLink>
          </div> : ""}

          {/* Register , login and logout buttons */}

          {token ? <button onClick={logout} className=' hidden lg:block py-2 px-8 cursor-pointer ms-auto bg-red-500 text-white rounded-4xl'>
            Logout
          </button> : <div className=" ms-auto flex items-center gap-3">
            <NavLink to='/register' className=' py-2 px-8 bg-green-500 text-white rounded-4xl'>
              Register
            </NavLink>
            <NavLink to='/login' className=' py-2 px-8 bg-green-500 text-white rounded-4xl'>
              Login
            </NavLink>
          </div>}

          {/* Mobile Menu Button */}
          {token ? <div className="lg:hidden ml-auto">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div> : ""}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && token ? (
        <div className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 sm:px-3">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "block text-green-500 font-semibold rounded-md px-3 py-2"
                  : "block text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md px-3 py-2"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "block text-green-500 font-semibold rounded-md px-3 py-2"
                  : "block text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md px-3 py-2"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/categories"
              className={({ isActive }) =>
                isActive
                  ? "block text-green-500 font-semibold rounded-md px-3 py-2"
                  : "block text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md px-3 py-2"
              }
            >
              Categories
            </NavLink>
            <NavLink
              to="/brands"
              className={({ isActive }) =>
                isActive
                  ? "block text-green-500 font-semibold rounded-md px-3 py-2"
                  : "block text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md px-3 py-2"
              }
            >
              Brands
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "block text-green-500 font-semibold rounded-md px-3 py-2"
                  : "block text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md px-3 py-2"
              }
            >
              Cart
            </NavLink>
            <NavLink
              to="/allorders"
              className={({ isActive }) =>
                isActive
                  ? "block text-green-500 font-semibold rounded-md px-3 py-2"
                  : "block text-gray-700 hover:bg-gray-100 hover:text-green-500 rounded-md px-3 py-2"
              }
            >
              All Orders
            </NavLink>
            <button onClick={logout} className=" text-red-500 px-3 py-2 hover:text-red-700 cursor-pointer mt-3">Logout</button>
          </div>
        </div>
      ) : ""}
    </nav>
  );
};

export default Navbar;
