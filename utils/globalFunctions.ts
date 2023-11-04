import { Genre, ProductionCompany } from "./interfaces";

export const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const date: Date = new Date(dateString);
  const formattedDate: string = date.toLocaleDateString(undefined, options);
  const day: number = date.getDate();
  const suffix: string = getNumberSuffix(day);
  return formattedDate.replace(/\d+/, day + suffix);
};

export const extractYear = (dateString: string): string => {
  return dateString.split("-")[0];
};

export const getNumberSuffix = (day: number): string => {
  if (day >= 11 && day <= 13) {
    return "th";
  }
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};

export const convertToUrlFormat = (title: string): string => {
  title = title.trim();
  title = title.replace(/[-:.]/g, "");
  title = title.replace(/\s+/g, "-");
  title = title.toLowerCase();

  return title;
};

export function joinNames<T extends { name: string }>(data: T[]): string {
  return data.map((item) => item.name).join(", ");
}

export const formatMinutes = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const formatMoney = (amount: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount);
};

export const getRadialColor = (vote: number) => {
  if (vote >= 7.0) return "text-emerald-500 border-emerald-500";
  if (vote >= 4.0) return "text-yellow-500 border-yellow-500";
  if (vote > 0) return "text-rose-500 border-rose-500";
  return "text-slate-400 border-slate-400";
};

export const decodeQuery = (query: string): string => {
  return decodeURIComponent(query).replace(/[^a-zA-Z0-9']/g, " ");
};
