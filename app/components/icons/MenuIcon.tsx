import { CustomableIcon } from "@/utils/interfaces";
import { motion } from "framer-motion";

const MenuIcon = ({ className }: CustomableIcon) => {
  return (
    <motion.svg
      animate={{ opacity: 1 }}
      transition={{
        type: "spring",
      }}
      exit={{ opacity: 0 }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"
      />
    </motion.svg>
  );
};

export default MenuIcon;
