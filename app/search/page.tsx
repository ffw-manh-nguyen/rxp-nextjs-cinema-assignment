import { getSearchMovies } from "@/app/api";
import MovieList from "@/app/components/MovieList";
import NotFound from "@/app/components/NotFound";
import Pagination from "@/app/components/Pagination";
import { notFound } from "next/navigation";

export const decodeQuery = (query: string): string => {
  return decodeURIComponent(query).replace(/[^a-zA-Z0-9']/g, " ");
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) => {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  if (query === "") {
    notFound();
  }

  const movies = await getSearchMovies({
    query: query,
    page: currentPage,
  });

  const decodedQuery = decodeQuery(query);

  return movies?.total_results > 0 ? (
    <>
      <MovieList
        title={`${decodedQuery} - Search Results`}
        movies={movies.results}
        totalResults={movies.total_results}
        layout="grid"
      />
      <Pagination totalPages={movies.total_pages} page={movies.page} />
    </>
  ) : (
    <NotFound searchQuery={decodedQuery} />
  );
};

export default SearchPage;
