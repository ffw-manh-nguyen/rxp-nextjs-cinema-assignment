import { getMovieList } from "@/app/api";
import Hero from "@/app/components/Hero";
import MovieList from "@/app/components/MovieList";

const Home = async () => {
  const nowPlayingMovies = await getMovieList({
    query: "now_playing",
    page: 1,
  });

  return (
    <>
      <Hero />
      <div className="flex flex-col gap-14 pb-20">
        <MovieList
          title="NOW PLAYING"
          movies={nowPlayingMovies.results}
          totalResults={nowPlayingMovies.total_results}
          layout="carousel"
        />
      </div>
    </>
  );
};

export default Home;
