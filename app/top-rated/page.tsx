"use client";

import React, { useEffect, useState } from "react";
import MovieList from "@/app/components/MovieList";
import { getMovieList } from "@/app/api";
import Pagination from "@/app/components/Pagination";
import { MovieListResponse } from "@/utils/interfaces";
import { useSearchParams } from "next/navigation";

const TopRatedMovies = async () => {
  const [topRatedMovies, setMovies] = useState<MovieListResponse>();
  const searchParams = useSearchParams();
  const pageMatch = `${searchParams}`.match(/page=\d+/);
  const pageNumb = pageMatch ? pageMatch[0].slice(-1) : "1";

  useEffect(() => {
    const searchMovie = async () => {
      const result = await getMovieList({
        query: "top_rated",
        page: pageNumb,
      });
      setMovies(result);
    };
    searchMovie();
  }, [pageNumb]);

  if (topRatedMovies) {
    return (
      <>
        <MovieList
          title="TOP RATED MOVIES"
          movies={topRatedMovies.results}
          total_results={topRatedMovies.total_results}
          layout="grid"
        />
        <Pagination
          total_pages={topRatedMovies.total_pages}
          page={topRatedMovies.page}
        />
      </>
    );
  }
};

export default TopRatedMovies;
