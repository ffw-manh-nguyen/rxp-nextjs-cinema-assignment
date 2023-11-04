import { getMovieDetail } from "@/app/api";
import RadialProgress from "@/app/components/RadialProgress";
import {
  extractYear,
  formatDate,
  formatMinutes,
  formatMoney,
  joinNames,
} from "@/utils/globalFunctions";
import { MovieDetail } from "@/utils/interfaces";
import Image from "next/image";

interface MovieDetailParams {
  params: {
    slug: string;
  };
}

const MovieDetail = async ({ params: { slug } }: MovieDetailParams) => {
  const movieData = await getMovieDetail(parseInt(slug));

  const {
    title,
    poster_path,
    backdrop_path,
    release_date,
    genres,
    runtime,
    tagline,
    overview,
    vote_average,
    production_companies,
    production_countries,
    spoken_languages,
    revenue,
    budget,
    status,
  }: MovieDetail = movieData;

  return (
    <>
      <div className="text-sm">
        <div className="relative flex w-full items-center gap-5 overflow-hidden bg-gradient-to-t from-slate-900 to-transparent px-5 pb-10 pt-28 md:px-20">
          <Image
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={title}
            className="-z-10 object-cover blur-sm brightness-50"
            fill
          />

          <div className="flex flex-col gap-5 md:flex-row">
            <div className="basis-1/4">
              <div className="relative aspect-[2/3] w-1/2 overflow-hidden rounded-lg sm:w-1/3 md:w-full">
                <Image
                  src={`https://image.tmdb.org/t/p/original/${poster_path}`}
                  alt={title}
                  fill
                />
              </div>
            </div>
            <div className="flex h-full basis-3/4 flex-col gap-5">
              <div>
                <h1 className="mb-2 text-3xl font-bold md:mb-0">
                  {title} ({extractYear(release_date)})
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2">
                  <span>{formatDate(release_date)}</span>
                  <span className="hidden text-xl font-bold sm:block">•</span>
                  <span>{joinNames(genres)}</span>
                  <span className="hidden text-xl font-bold sm:block">•</span>
                  <span>{formatMinutes(runtime)}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <RadialProgress
                  voteAverage={vote_average}
                  size="3.5rem"
                  thickness="4.5px"
                  className="text-sm font-bold"
                />
                {tagline && <p className="italic text-slate-300">{tagline}</p>}
              </div>
              <div>
                <h2 className="text-lg font-bold">Overview</h2>
                <p>{overview}</p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-3">
                <div className="order-1">
                  <h2 className="font-semibold">Status</h2>
                  <p className="text-slate-300">{status}</p>
                </div>
                <div className="order-3 sm:order-2">
                  <h2 className="font-semibold">Revenue</h2>
                  <p className="text-slate-300">
                    {revenue > 0 ? formatMoney(revenue) : "-"}
                  </p>
                </div>
                <div className="order-4 sm:order-3">
                  <h2 className="font-semibold">Budget</h2>
                  <p className="text-slate-300">
                    {budget > 0 ? formatMoney(budget) : "-"}
                  </p>
                </div>
                <div className="order-5 sm:order-4">
                  <h2 className="font-semibold">Production Companies</h2>
                  <p className="text-slate-300">
                    {joinNames(production_companies)}
                  </p>
                </div>
                <div className="order-6 sm:order-5">
                  <h2 className="font-semibold">Production Countries</h2>
                  <p className="text-slate-300">
                    {joinNames(production_countries)}
                  </p>
                </div>
                <div className="order-2 sm:order-6">
                  <h2 className="font-semibold">Spoken Languages</h2>
                  <p className="text-slate-300">
                    {joinNames(spoken_languages)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetail;
