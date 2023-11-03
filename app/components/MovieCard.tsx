import { formatDate } from "@/utils/globalFunctions";
import { Movie } from "@/utils/interfaces";
import Image from "next/image";
import Link from "next/link";
import RadialProgress from "./RadialProgress";

const MovieCard = ({
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: Movie) => {
  return (
    <Link
      href={`/movie/${id}`}
      className="group carousel-item flex w-72 flex-col overflow-hidden rounded-md bg-slate-800 hover:bg-slate-700"
    >
      <div className="relative aspect-[2/3] w-72 bg-slate-700">
        <Image
          src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt={title + " poster"}
          fill
          className="object-cover brightness-75 transition-all duration-100 group-hover:brightness-100"
        />
      </div>
      <div className="relative px-4 pb-6 pt-8 text-sm">
        <RadialProgress
          voteAverage={vote_average}
          size="3.2rem"
          thickness="4px"
          className="absolute -top-8 text-xs font-bold"
        />
        <p className="text-xs font-medium text-slate-400">
          {formatDate(release_date)}
        </p>
        <h2 className="line-clamp-1 overflow-hidden font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default MovieCard;
