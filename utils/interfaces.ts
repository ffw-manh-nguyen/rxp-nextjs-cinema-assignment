export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  poster_path: string;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logoPath: string;
  name: string;
}

export interface SpokenLanguage {
  englishName: string;
  iso_639_1: string;
  name: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface MovieDetail extends Movie {
  original_title: string;
  overview: string;
  original_language: string;
  backdrop_path: string;
  vote_count: number;
  adult: boolean;
  budget: number;
  genres: Genre[];
  production_companies: ProductionCompany[];
  spoken_languages: SpokenLanguage[];
  production_countries: ProductionCountry[];
  homepage: string;
  status: string;
  tagline: string;
  runtime: number;
  revenue: number;
}

export interface MovieListResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface MovieListComponent {
  title: string;
  movies: Movie[];
  totalResults: number;
  layout: string;
}

export interface MovieList {
  type: "now_playing" | "popular" | "top_rated" | "upcoming";
}

export interface CustomableIcon {
  className?: string;
}

export interface RadialProgress {
  voteAverage: number;
  className?: string;
  size: string;
  thickness: string;
}
