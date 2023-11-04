import MovieList from "@/app/components/MovieList";
import Pagination from "@/app/components/Pagination";
import { getMovieList } from "@/app/api";

const TopRatedMovies = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const topRatedMovies = await getMovieList({
    query: "top_rated",
    page: currentPage,
  });

  return (
    <>
      <MovieList
        title="TOP RATED MOVIES"
        movies={topRatedMovies.results}
        totalResults={topRatedMovies.total_results}
        layout="grid"
      />
      <Pagination
        totalPages={topRatedMovies.total_pages}
        page={topRatedMovies.page}
      />
    </>
  );
};

export default TopRatedMovies;
