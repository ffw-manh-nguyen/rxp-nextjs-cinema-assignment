import { MovieListComponent } from "@/utils/interfaces";
import { Suspense } from "react";
import MovieCard from "./MovieCard";
import MovieListSkeleton from "./MovieListSkeleton";

const MovieList = async ({
  title,
  movies,
  total_results,
  layout,
}: MovieListComponent) => {
  return (
    <>
      {total_results > 0 && (
        <Suspense fallback={<MovieListSkeleton />}>
          <section className="px-5 pt-24">
            <h1 className="mb-5 text-2xl font-bold">{title}</h1>
            {layout === "grid" && (
              <div className="movie-list grid grid-flow-row justify-items-center gap-8 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
                {movies.map((movie, index) => {
                  return <MovieCard key={index} {...movie} />;
                })}
              </div>
            )}
            {layout === "carousel" && (
              <div className="movie-list carousel-end carousel flex gap-4 overflow-y-scroll pb-2">
                {movies.map((movie, index) => {
                  return <MovieCard key={index} {...movie} />;
                })}
              </div>
            )}
          </section>
        </Suspense>
      )}
    </>
  );
};

export default MovieList;
