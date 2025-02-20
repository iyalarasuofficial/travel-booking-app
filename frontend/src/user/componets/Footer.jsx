import React from "react";
import "../styles/Footer.css"; // Include custom styling

import logo from "../../assets/photos/logo.png";

const Footer = () => {
  return (
    <footer className="bg-white">
      <div className="bg-gray-100 pt-5">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 mx-5 lg:gap-8">
          <div>
            <div className="flex justify-center text-pink-600 sm:justify-center">
              <img src={logo} alt="logo" className="h-20 justify-center" />
            </div>

            <p className="mt-6 max-w-md text-center leading-relaxed text-gray-500 sm:max-w-xs sm:text-left">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt consequuntur amet culpa
              cum itaque neque.
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              {/* Social icons */}
              {/* Same as original */}
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 lg:text-left">About Us</p>

              <ul className="mt-8 space-y-4 text-sm lg:text-left">
                <li>
                  <a className="text-gray-700 transition hover:text-gray-700/75 no-underline" href="#">
                    Company History
                  </a>
                </li>
                <li>
                  <a className="text-gray-700 transition hover:text-gray-700/75 no-underline" href="#">
                    Meet the Team
                  </a>
                </li>
                <li>
                  <a className="text-gray-700 transition hover:text-gray-700/75 no-underline" href="#">
                    Employee Handbook
                  </a>
                </li>
                <li>
                  <a className="text-gray-700 transition hover:text-gray-700/75 no-underline" href="#">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 lg:text-left">Our Services</p>

              <ul className="mt-8 space-y-4 text-sm lg:text-left">
                <li>
                  <a className="text-gray-700 transition hover:text-gray-700/75 no-underline" href="#">
                    Travel Booking
                  </a>
                </li>
                <li>
                  <a className="text-gray-700 transition hover:text-gray-700/75 no-underline" href="#">
                    history
                  </a>
                </li>
                <li>
                  <a className="text-gray-700 transition hover:text-gray-700/75 no-underline" href="#">
                    Google Ads
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-gray-900 lg:text-left">Contact Us</p>

              <ul className="mt-8 space-y-4 text-sm lg:text-left">
                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end no-underline"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="flex-1 text-gray-700 no-underline">tripify@gmail.com</span>
                  </a>
                </li>

                <li>
                  <a
                    className="flex items-center justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end no-underline"
                    href="#"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="size-5 shrink-0 text-gray-900"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span className="flex-1 text-gray-700">0123456789</span>
                  </a>
                </li>

                <li className="flex items-start justify-center gap-1.5 ltr:sm:justify-start rtl:sm:justify-end">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-5 shrink-0 text-gray-900"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <address className="-mt-0.5 flex-1 not-italic text-gray-700">
                    213 Lane, London, United Kingdom
                  </address>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pb-2 border-t border-gray-100 ">
          <div className="text-center">
            <p className="mt-4 text-sm text-gray-500 sm:order-first sm:mt-0">
              &copy; 2024 All rights reserved | This website is made by{" "}
              <span className="font-semibold text-pink-800">Iyalarasu C</span>
            </p>
          </div>
        </div>


      </div>
    </footer>
  );
};

export default Footer;
