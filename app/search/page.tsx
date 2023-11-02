"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getSearchMovies } from "@/app/api";
import MovieList from "@/app/components/MovieList";
import NotFound from "@/app/components/NotFound";
import Pagination from "@/app/components/Pagination";
import { MovieListResponse } from "@/utils/interfaces";

const SearchPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryMatch = `${searchParams}`.match(/q=\w.+&/);
  const query = queryMatch ? queryMatch[0].slice(2, -1) : "";
  const pageMatch = `${searchParams}`.match(/&page=\d+/);
  const pageNumb = pageMatch ? pageMatch[0].slice(-1) : "1";
  const [movies, setMovies] = useState<MovieListResponse>();

  // useEffect(() => {
  // router.replace(`${pathname}?${queryMatch}&page=1`);
  // }, []);

  useEffect(() => {
    const searchMovie = async () => {
      const result = await getSearchMovies({
        query: query,
        page: pageNumb,
      });
      setMovies(result);
    };
    searchMovie();
  }, [pageNumb, query]);

  const decodedQuery = decodeURIComponent(query).replace(/[^a-zA-Z0-9']/g, " ");

  if (movies) {
    if (movies.total_results === 0) {
      return (
        <>
          <NotFound searchQuery={decodedQuery} />
        </>
      );
    } else {
      return (
        <>
          <MovieList
            title={`${decodedQuery} - Search Results`}
            movies={movies.results}
            total_results={movies.total_results}
            layout="grid"
          />
          <Pagination total_pages={movies.total_pages} page={movies.page} />
        </>
      );
    }
  }
};

export default SearchPage;
