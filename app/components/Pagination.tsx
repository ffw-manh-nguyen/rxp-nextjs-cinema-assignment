"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({
  total_pages,
  page,
}: {
  total_pages: number;
  page: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;
  const navUrl =
    `${searchParams}` === "" ? `${url}page=` : `${url.slice(0, -1)}`;

  return (
    <>
      <div className="pagination-wrapper pt-14">
        <ul className="flex items-center justify-center gap-7 font-semibold">
          <li>
            <Link
              href={`${navUrl}${Number(page) - 1}`}
              className={`cursor-pointer bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text transition-all duration-100 hover:text-transparent ${
                page > 1 ? "" : "hidden"
              }`}
            >
              Prev
            </Link>
          </li>
          <li>
            <Link
              href={`${navUrl}${Number(page) + 1}`}
              className={`cursor-pointer bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text transition-all duration-100 hover:text-transparent ${
                page < total_pages ? "" : "hidden"
              }`}
            >
              Next
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Pagination;
