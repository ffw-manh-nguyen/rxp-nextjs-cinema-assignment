import { CustomableIcon } from "@/utils/interfaces";
import { motion } from "framer-motion";

const XIcon = ({ className }: CustomableIcon) => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
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
        d="M6 18L18 6M6 6l12 12"
      />
    </motion.svg>
  );
};

export default XIcon;
