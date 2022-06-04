export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_FAVORITE = 'SET_FAVORITE';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_USER = 'SET_USER';
export const SET_TREND_SORT = 'SET_TREND_SORT';
export const TOGGLE_TREND_SORT = 'TOGGLE_TREND_SORT';
export const SET_MOV_SORT = 'SET_MOV_SORT';
export const TOGGLE_MOV_SORT = 'TOGGLE_MOV_SORT';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setFavorites(value) {
  return { type: SET_FAVORITE, value };
}

export function toggleFavorite(movieId) {
  return { type: TOGGLE_FAVORITE, movieId };
}

export function setUser(user) {
  return { type: SET_USER, user };
}

export function setTrendingSort(sortArr) {
  return { type: SET_TREND_SORT, sortArr };
}

export function toggleTrendingSort(toggle) {
  return { type: TOGGLE_TREND_SORT, toggle };
}

export function setMovieSort(sortArr) {
  return { type: SET_MOV_SORT, sortArr };
}

export function toggleMovieSort(toggle) {
  return { type: TOGGLE_MOV_SORT, toggle };
}