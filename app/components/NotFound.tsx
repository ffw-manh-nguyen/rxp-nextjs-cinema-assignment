import React from "react";
import Link from "next/link";

const NotFound = ({ searchQuery }: { searchQuery: string }) => {
  return (
    <>
      <section className="px-5 pt-24">
        <h2>Sorry!</h2>
        <div className="pb-10">
          There were no results for &quot;{searchQuery}&quot;
        </div>
        <div className="back-to-home font-bold">
          <Link
            href="/"
            className="cursor-pointer bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text transition-all duration-100 hover:text-transparent"
          >
            Back to home
          </Link>
        </div>
      </section>
    </>
  );
};

export default NotFound;
