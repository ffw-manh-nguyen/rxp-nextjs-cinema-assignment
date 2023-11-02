"use client";

import React, { useEffect, useState } from "react";
import MovieList from "@/app/components/MovieList";
import { getMovieList } from "@/app/api";
import Pagination from "@/app/components/Pagination";
import { MovieListResponse } from "@/utils/interfaces";
import { useSearchParams } from "next/navigation";

const UpcomingMovies = async () => {
  const [upcomingMovies, setMovies] = useState<MovieListResponse>();
  const searchParams = useSearchParams();
  const pageMatch = `${searchParams}`.match(/page=\d+/);
  const pageNumb = pageMatch ? pageMatch[0].slice(-1) : "1";

  useEffect(() => {
    const searchMovie = async () => {
      const result = await getMovieList({
        query: "upcoming",
        page: pageNumb,
      });
      setMovies(result);
    };
    searchMovie();
  }, [pageNumb]);

  if (upcomingMovies) {
    return (
      <>
        <MovieList
          title="UPCOMING MOVIES"
          movies={upcomingMovies.results}
          total_results={upcomingMovies.total_results}
          layout="grid"
        />
        <Pagination
          total_pages={upcomingMovies.total_pages}
          page={upcomingMovies.page}
        />
      </>
    );
  }
};

export default UpcomingMovies;
