import { CSSProperties } from "react";

const getRadialColor = (vote: number) => {
  if (vote >= 7.0) return "text-emerald-500 border-emerald-500";
  if (vote >= 4.0) return "text-yellow-500 border-yellow-500";
  if (vote > 0) return "text-rose-500 border-rose-500";
  return "text-slate-400 border-slate-400";
};

interface RadialProgress {
  voteAverage: number;
  className?: string;
  size: string;
  thickness: string;
}

const RadialProgress = ({
  voteAverage,
  className,
  size,
  thickness,
}: RadialProgress) => {
  return (
    <div>
      <div
        style={
          {
            "--value": voteAverage > 0 ? voteAverage * 10 : 100,
            "--size": size,
            "--thickness": thickness,
          } as CSSProperties
        }
        className={`${getRadialColor(
          voteAverage
        )} radial-progress bg-slate-800 ${className}`}
      >
        <span>
          {voteAverage > 0 ? `${Number(voteAverage.toFixed(1)) * 10}%` : "NR"}
        </span>
      </div>
    </div>
  );
};

export default RadialProgress;
