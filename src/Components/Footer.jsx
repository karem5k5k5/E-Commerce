import React from "react";
import amazon from '../assets/amazon-pay.png'
import ex from '../assets/american-express.png'
import mc from '../assets/mastercard.png'
import pp from '../assets/paypal.png'
import gPlay from '../assets/google-play.png'
import appStore from '../assets/app-store.png'

const Footer = () => {
  return (
    <footer className="bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Text and Input */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-gray-800">
              Get the FreshCart app
            </h2>
            <p className="text-gray-600">
              We will send you a link, open it on your phone to download the app.
            </p>
          </div>

          {/* Input and Button */}
          <div className="w-full md:w-auto flex items-center">
            <input
              type="email"
              placeholder="Email .."
              className="flex-grow md:flex-none border  border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="bg-green-500 text-white font-semibold rounded-md px-4 py-2 ml-2 hover:bg-green-600 transition">
              Share App Link
            </button>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-6" />

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-center">
          {/* Payment Partners */}
          <div className="flex items-center space-x-4 mb-6 lg:mb-0">
            <span>Payment Partners</span>
            <img
              src={ex}
              alt="American Express"
              className="h-4"
            />
            <img
              src={mc}
              alt="MasterCard"
              className="h-4"
            />
            <img
              src={pp}
              alt="PayPal"
              className="h-4 w-[60px]"
            />
            <img
              src={amazon}
              alt="Amazon Pay"
              className="h-4 w-[60px]"
            />
          </div>

          {/* App Store Links */}
          <div className="flex flex-wrap justify-center items-center gap-3">
            <p className=" leading-9">Get delivers with FreshCart</p>
            <img
              src={gPlay}
              alt="App Store"
              className="lg:h-10 h-6 lg:min-w-[80px] min-w-[30px]"
            />
            <img
              src={appStore}
              alt="Google Play"
              className="lg:h-10 h-6 lg:min-w-[80px] min-w-[30px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
