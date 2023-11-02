"use client";

import React, { useEffect, useState } from "react";
import MovieList from "@/app/components/MovieList";
import { getMovieList } from "@/app/api";
import Pagination from "@/app/components/Pagination";
import { useSearchParams } from "next/navigation";
import { MovieListResponse } from "@/utils/interfaces";

const PopularMovies = async () => {
  const [popularMovies, setMovies] = useState<MovieListResponse>();
  const searchParams = useSearchParams();
  const pageMatch = `${searchParams}`.match(/page=\d+/);
  const pageNumb = pageMatch ? pageMatch[0].slice(-1) : "1";

  useEffect(() => {
    const searchMovie = async () => {
      const result = await getMovieList({
        query: "popular",
        page: pageNumb,
      });
      setMovies(result);
    };
    searchMovie();
  }, [pageNumb]);

  if (popularMovies) {
    return (
      <>
        <MovieList
          title="POPULAR MOVIES"
          movies={popularMovies.results}
          total_results={popularMovies.total_results}
          layout="grid"
        />
        <Pagination
          total_pages={popularMovies.total_pages}
          page={popularMovies.page}
        />
      </>
    );
  }
};

export default PopularMovies;
