import MovieList from "@/app/components/MovieList";
import Pagination from "@/app/components/Pagination";
import { getMovieList } from "@/app/api";

const PopularMovies = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const popularMovies = await getMovieList({
    query: "popular",
    page: currentPage,
  });

  return (
    <>
      <MovieList
        title="POPULAR MOVIES"
        movies={popularMovies.results}
        totalResults={popularMovies.total_results}
        layout="grid"
      />
      <Pagination
        totalPages={popularMovies.total_pages}
        page={popularMovies.page}
      />
    </>
  );
};

export default PopularMovies;
