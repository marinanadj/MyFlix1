import { combineReducers } from 'redux';
import {
  SET_FAVORITE,
  SET_FILTER,
  SET_MOVIES,
  TOGGLE_FAVORITE,
  SET_USER,
  SET_MOV_SORT,
  TOGGLE_MOV_SORT,
  SET_TREND_SORT,
  TOGGLE_TREND_SORT,
} from '../actions/actions';

//used for filtering movies
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

//handles setting array of favorites and updating favorites
function favorites(state = [], action) {
  switch (action.type) {
    case SET_FAVORITE:
      return action.value;
    case TOGGLE_FAVORITE:
      if (state.includes(action.movieId)) {
        return state.filter((val) => val !== action.movieId);
      } else {
        return [...state, action.movieId];
      }
    default:
      return state;
  }
}

//stores logged in user
function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    default:
      return state;
  }
}

//handles sorting of movie lists
function trendSort(state = {}, action) {
  switch (action.type) {
    case SET_TREND_SORT:
      return action.sortArr;
    //updating sort direction using 0 for null, 1 ascending, 2 descending
    case TOGGLE_TREND_SORT:
      let altKey = '';
      for (let k in state) {
        if (k != action.toggle) {
          altKey = k;
        }
      }
      return {
        ...state,
        [action.toggle]:
          state[action.toggle] + 1 > 2 ? 0 : (state[action.toggle] += 1),
        [altKey]: 0,
      };
    default:
      return state;
  }
}

function movieSort(state = {}, action) {
  switch (action.type) {
    case SET_MOV_SORT:
      return action.sortArr;
    //updating sort direction using 0 for null, 1 ascending, 2 descending
    case TOGGLE_MOV_SORT:
      let altKey = '';
      for (let k in state) {
        if (k != action.toggle) {
          altKey = k;
        }
      }
      return {
        ...state,
        [action.toggle]:
          state[action.toggle] + 1 > 2 ? 0 : (state[action.toggle] += 1),
        [altKey]: 0,
      };
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  favorites,
  user,
  trendSort,
  movieSort,
});

export default moviesApp;