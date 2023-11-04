import { CSSProperties, useMemo } from "react";
import { getRadialColor } from "@/utils/globalFunctions";
import { RadialProgress } from "@/utils/interfaces";

const RadialProgress = ({
  voteAverage,
  className,
  size,
  thickness,
}: RadialProgress) => {
  const rating = useMemo(
    () => (voteAverage > 0 ? `${Number(voteAverage.toFixed(1)) * 10}%` : "NR"),
    [voteAverage]
  );
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
        <span>{rating}</span>
      </div>
    </div>
  );
};

export default RadialProgress;
