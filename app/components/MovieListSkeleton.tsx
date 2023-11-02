const MovieListSkeleton = () => {
  return (
    <section className="px-5 md:px-20">
      <div className="mb-5 h-6 w-72 animate-pulse rounded-full bg-slate-700"></div>
      <div className="flex gap-2">
        <div className="aspect-[2/3] w-44 animate-pulse rounded-md bg-slate-700"></div>
        <div className="aspect-[2/3] w-44 animate-pulse rounded-md bg-slate-700"></div>
        <div className="aspect-[2/3] w-44 animate-pulse rounded-md bg-slate-700"></div>
        <div className="aspect-[2/3] w-44 animate-pulse rounded-md bg-slate-700"></div>
        <div className="aspect-[2/3] w-44 animate-pulse rounded-md bg-slate-700"></div>
      </div>
    </section>
  );
};

export default MovieListSkeleton;
