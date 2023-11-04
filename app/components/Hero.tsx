"use client";

import { Righteous } from "next/font/google";
import Image from "next/image";
import MoviePoster from "@/public/hero-poster.jpg";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LINKS from "@/utils/links";
import { decodeQuery } from "../search/page";

const logoFont = Righteous({ weight: "400", subsets: ["latin"] });

const Hero = () => {
  const [searchQuery, setsearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.length === 0 || searchQuery.trim() === "") {
      setsearchQuery("");
      return;
    }
    router.push(
      `${LINKS.SEARCH.PATHNAME}?query=${encodeURIComponent(searchQuery)}&page=1`
    );
  };
  return (
    <section className="relative flex h-screen items-center justify-center bg-gradient-to-t from-slate-900 to-transparent">
      <div className="flex flex-col items-center gap-5 p-5 text-center md:w-4/5 lg:w-2/3">
        <Image
          src={MoviePoster}
          alt="Movie Posters"
          fill
          placeholder="blur"
          className="-z-10 object-cover brightness-50"
        />

        <h1 className="text-5xl font-bold">
          WELCOME TO{" "}
          <span
            className={`${logoFont.className} bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-transparent`}
          >
            CINEMA
          </span>
        </h1>
        <p>
          Discover an extensive collection of movies, TV shows, and fascinating
          personalities. Explore our vast library now and experience the magic
          of cinema like never before.
        </p>

        <form
          className="flex w-full items-center sm:w-2/3"
          onSubmit={handleSearch}
        >
          <input
            type="text"
            placeholder="Find Your Favourite Movie"
            className="h-full grow rounded-l-full border-2 border-slate-600 bg-transparent py-4 pl-6 font-medium placeholder-slate-500 backdrop-blur-md transition-all duration-100 focus:border-white focus:outline-none"
            onInput={(e) => setsearchQuery(decodeQuery(e.currentTarget.value))}
          />
          <button className="rounded-r-full bg-gradient-to-r from-emerald-500 to-sky-500 py-4 pl-4 pr-6 font-semibold transition-all duration-100 hover:to-transparent">
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Hero;
