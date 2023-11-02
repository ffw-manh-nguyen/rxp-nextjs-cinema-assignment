import { getMovieList } from "@/app/api";
import Hero from "@/app/components/Hero";
import MovieList from "@/app/components/MovieList";

const Home = async () => {
  const playingMoviesData = await getMovieList({
    query: "now_playing",
    page: "1",
  });

  const [playingMovies] = await Promise.all([playingMoviesData]);

  return (
    <>
      <div>
        <Hero />
        <div className="flex flex-col gap-14 pb-20">
          <MovieList
            title="NOW PLAYING"
            movies={playingMovies.results}
            total_results={playingMovies.total_results}
            layout="carousel"
          />
        </div>
      </div>
    </>
  );
};

export default Home;
