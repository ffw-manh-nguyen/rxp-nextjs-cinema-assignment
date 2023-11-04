"use client";

import { menus } from "@/utils/navMenus";
import { AnimatePresence, motion } from "framer-motion";
import { Righteous } from "next/font/google";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavMobile from "./NavMobile";
import MenuIcon from "./icons/MenuIcon";
import XIcon from "./icons/XIcon";
import SearchBar from "./SearchBar/SearchBar";
import { deleteSession } from "@/app/api";

const logoFont = Righteous({ weight: "400", subsets: ["latin"] });

export const getCookie = (cname: string) => {
  if (typeof document !== "undefined") {
    const cookie = document.cookie;
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavMobile, setShowNavMobile] = useState(false);
  const [isAuth, setAuth] = useState(false);
  const [authCookie, setAuthCookie] = useState("");

  useEffect(() => {
    const cookie = getCookie("cinema-auth");
    setAuth(cookie ? true : false);
    setAuthCookie(`${cookie}`);
  }, [isAuth]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop >= 80);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = async () => {
    await deleteSession({ sessionId: `${authCookie}` });
    document.cookie =
      "cinema-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAuthCookie("");
    window.location.href = "/login";
    return;
  };

  return (
    <>
      <nav className="fixed z-10 w-full">
        <div
          className={`menu-container flex max-w-screen-2xl items-center justify-between px-5 py-5 md:px-20 ${
            isScrolled ? "border-b border-b-slate-600 backdrop-blur-lg" : ""
          }`}
        >
          <Link
            href={"/"}
            className={`${logoFont.className} bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-4xl text-transparent`}
          >
            CINEMA
          </Link>
          <ul className="hidden items-center gap-7 font-semibold md:flex">
            <SearchBar />
            {menus.map((menu, index) => {
              return (
                <li key={index}>
                  <Link
                    href={menu.route}
                    className="cursor-pointer bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text transition-all duration-100 hover:text-transparent"
                  >
                    {menu.name}
                  </Link>
                </li>
              );
            })}
            {isAuth && (
              <div className="flex space-x-5">
                <a
                  className="flex cursor-pointer bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text transition-all duration-100 hover:text-transparent"
                  onClick={handleLogout}
                >
                  <svg
                    className="mr-2 mt-0.5 h-5 w-5 from-emerald-500 to-sky-500 fill-current text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    version="1.1"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path d="M10,17V14H3V10H10V7L15,12L10,17M10,2H19A2,2 0 0,1 21,4V20A2,2 0 0,1 19,22H10A2,2 0 0,1 8,20V18H10V20H19V4H10V6H8V4A2,2 0 0,1 10,2Z"></path>
                  </svg>
                  Logout
                </a>
              </div>
            )}
          </ul>
          <motion.button
            whileTap={{ rotate: 90 }}
            onClick={() => setShowNavMobile((state) => !state)}
            className=" block h-10 w-10 md:hidden"
          >
            <AnimatePresence>
              {showNavMobile ? <XIcon /> : <MenuIcon />}
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>
      <AnimatePresence>{showNavMobile && <NavMobile />}</AnimatePresence>
    </>
  );
};

export default Navbar;
