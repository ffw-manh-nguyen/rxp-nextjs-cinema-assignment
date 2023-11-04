import MovieList from "@/app/components/MovieList";
import Pagination from "@/app/components/Pagination";
import { getMovieList } from "@/app/api";

const UpcomingMovies = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const currentPage = Number(searchParams?.page) || 1;
  const upcomingMovies = await getMovieList({
    query: "upcoming",
    page: currentPage,
  });

  return (
    <>
      <MovieList
        title="UPCOMING MOVIES"
        movies={upcomingMovies.results}
        totalResults={upcomingMovies.total_results}
        layout="grid"
      />
      <Pagination
        totalPages={upcomingMovies.total_pages}
        page={upcomingMovies.page}
      />
    </>
  );
};

export default UpcomingMovies;
