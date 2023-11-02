import { MovieDetail, MovieListResponse } from "@/utils/interfaces";
import axios from "axios";

const API_BASE_URL = "https://api.themoviedb.org/3";
const MOVIE_BASE_URL = `${API_BASE_URL}/movie`;
const SEARCH_MOVIE_URL = `${API_BASE_URL}/search/movie`;

export const tmdbAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
  },
});

export const getMovieList = async ({
  query,
  page,
}: {
  query: string;
  page: string;
}): Promise<MovieListResponse> => {
  const requestUrl = `${MOVIE_BASE_URL}/${query}`;
  try {
    const res = await tmdbAPI.get(requestUrl, {
      params: {
        page: page !== "" ? page : 1,
      },
    });
    return res.data;
  } catch (err) {
    return { page: 0, results: [], total_pages: 0, total_results: 0 };
  }
};

export const getMovieDetail = async (query: number): Promise<MovieDetail> => {
  const requestUrl = `${MOVIE_BASE_URL}/${query}`;
  try {
    const res = await tmdbAPI.get(requestUrl);
    return res.data;
  } catch (err) {
    return {
      id: 0,
      title: "",
      vote_average: 0,
      poster_path: "",
      release_date: "",
      original_title: "",
      overview: "",
      original_language: "",
      backdrop_path: "",
      vote_count: 0,
      adult: false,
      budget: 0,
      genres: [],
      production_companies: [],
      spoken_languages: [],
      production_countries: [],
      homepage: "",
      status: "",
      tagline: "",
      runtime: 0,
      revenue: 0,
    };
  }
};

export const getSearchMovies = async ({
  query,
  page,
}: {
  query: string;
  page: string | null;
}): Promise<MovieListResponse> => {
  try {
    const res = await tmdbAPI.get(SEARCH_MOVIE_URL, {
      params: {
        query: query,
        page: page,
      },
    });
    return res.data;
  } catch (err) {
    return { page: 0, results: [], total_pages: 0, total_results: 0 };
  }
};

export const getRequestToken = async () => {
  try {
    const res = await tmdbAPI.get(`${API_BASE_URL}/authentication/token/new`);
    return res.data;
  } catch (err) {
    return err;
  }
};

export const validateRequestToken = async ({
  username,
  password,
  request_token,
}: {
  username: string;
  password: string;
  request_token: string;
}) => {
  try {
    const res = await tmdbAPI.post(
      `${API_BASE_URL}/authentication/token/validate_with_login`,
      {
        username: username,
        password: password,
        request_token: request_token,
      }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const createSession = async ({
  request_token,
}: {
  request_token: string;
}) => {
  try {
    const res = await tmdbAPI.post(
      `${API_BASE_URL}/authentication/session/new`,
      { request_token: request_token }
    );
    return res.data;
  } catch (err) {
    return err;
  }
};

export const deleteSession = async ({ session_id }: { session_id: string }) => {
  try {
    const res = await tmdbAPI.delete(`${API_BASE_URL}/authentication/session`, {
      data: {
        session_id: session_id,
      },
    });
    return res.data;
  } catch (err) {
    return err;
  }
};
