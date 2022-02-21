import axios from 'axios';

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = 'api_key=7516b14047da48d78efa4f404303df82';

// Get Popular Movies
export const getPopularMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/movie/popular?${apiKey}`,
  );
  return resp.data.results;
}

//Get Upcoming Movies
export const getUpcomingMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/movie/upcoming?${apiKey}`,
  );
  return resp.data.results;
}

// Get Popular Tv
export const getPopularTv = async () => {
  const resp = await axios.get(
    `${apiUrl}/tv/popular?${apiKey}`,
  );
  return resp.data.results;
}

//Get Family Movies
export const getFamilyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return resp.data.results;
}

//Get Fantasy Movies
export const getFantasyMovies = async () => {
  const resp = await axios.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=14`,
  );
  return resp.data.results;
}

//Get Movie
export const getMovie = async (id) => {
  const resp = await axios.get(
    `${apiUrl}/movie/${id}?${apiKey}`,
  );
  return resp.data;
}

//Search Movie or TV
export const searchMovieTv = async (query, type) => {
  const resp = await axios.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return resp.data.results;
}