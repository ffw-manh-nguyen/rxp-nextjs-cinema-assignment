"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const Pagination = ({
  totalPages,
  page,
}: {
  totalPages: number;
  page: number;
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <>
      <div className="pagination-wrapper pt-14">
        <ul className="flex items-center justify-center gap-7 font-semibold">
          <li>
            <Link
              href={createPageURL(Number(pageParam) - 1)}
              className={`cursor-pointer bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text transition-all duration-100 hover:text-transparent ${
                page > 1 ? "" : "hidden"
              }`}
            >
              Prev
            </Link>
          </li>
          <li>
            <Link
              href={createPageURL(Number(pageParam) + 1)}
              className={`cursor-pointer bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text transition-all duration-100 hover:text-transparent ${
                page < totalPages ? "" : "hidden"
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
