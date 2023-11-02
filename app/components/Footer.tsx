import { Righteous } from "next/font/google";

const logoFont = Righteous({ weight: "400", subsets: ["latin"] });

const footerContents = [
  {
    title: "ABOUT US",
    contents: ["Contact", "FAQ", "API", "Pricing"],
  },
  {
    title: "SOCIALS",
    contents: ["Instagram", "Twitter", "Facebook"],
  },
  {
    title: "LEGAL",
    contents: ["Terms of Use", "Privacy Policy", "Handbook"],
  },
];

const Footer = () => {
  return (
    <footer className="mt-20 flex flex-col items-center justify-between gap-10 border-t border-slate-600 px-5 py-10 text-sm sm:flex-row sm:items-start md:px-20">
      <div className="flex gap-7">
        {footerContents.map((item, index) => {
          return (
            <div key={index} className="flex flex-col gap-2">
              <h3 className="font-semibold">{item.title}</h3>
              <ul className="flex flex-col gap-1">
                {item.contents.map((content, index) => {
                  return (
                    <li
                      key={index}
                      className="cursor-pointer text-slate-400 transition-all duration-150 hover:text-white hover:underline"
                    >
                      {content}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <div className="flex flex-col gap-2 text-center sm:items-end sm:text-end">
        <h1 className={`${logoFont.className} text-xl`}>CINEMA</h1>
        <p className="text-slate-400">
          Copyright © {new Date().getFullYear()} - All right reserved{" "}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
