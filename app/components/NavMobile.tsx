import { menus } from "@/utils/navMenus";
import { motion } from "framer-motion";
import { Righteous } from "next/font/google";
import Link from "next/link";
import SearchBar from "./SearchBar/SearchBar";
import { useState, useEffect } from "react";
import { deleteSession } from "@/app/api";
import { getCookie } from "./Navbar";

const logoFont = Righteous({ weight: "400", subsets: ["latin"] });

const NavMobile = () => {
  const [isAuth, setAuth] = useState(false);
  const [authCookie, setAuthCookie] = useState("");

  useEffect(() => {
    const cookie = getCookie("cinema-auth");
    setAuth(cookie ? true : false);
    setAuthCookie(`${cookie}`);
  }, [isAuth]);

  const handleLogout = async () => {
    await deleteSession({ sessionId: `${authCookie}` });
    document.cookie =
      "cinema-auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setAuthCookie("");
    window.location.href = "/login";
    return;
  };

  return (
    <motion.div
      initial={{ x: "-100vh" }}
      animate={{ x: 0 }}
      transition={{
        type: "spring",
        stiffness: 40,
        mass: 0.8,
        velocity: 0.3,
      }}
      exit={{ x: "-100vh" }}
      className="fixed z-50 flex h-screen w-72 flex-col gap-3 bg-slate-800 p-5"
    >
      <h1
        className={`${logoFont.className} w-fit bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-3xl text-transparent`}
      >
        CINEMA
      </h1>

      <hr className="border-slate-600" />

      <div className="flex flex-col font-semibold">
        <li>
          <SearchBar />
        </li>
        {menus.map((menu, index) => {
          return (
            <Link
              key={index}
              href={menu.route}
              className="w-full cursor-pointer rounded-md from-emerald-500 to-sky-500 p-2 transition-all duration-100 hover:bg-gradient-to-r"
            >
              {menu.name}
            </Link>
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
      </div>
    </motion.div>
  );
};

export default NavMobile;
