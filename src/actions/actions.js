//define action-types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const SET_SORT = 'SET_SORT';
export const TOGGLE_PW = 'TOGGLE_PW';
export const SET_GENRE = 'SET_GENRE';
export const SET_DIRECTOR = 'SET_DIRECTOR';

//define action creators
export function setMovies( value ) {
  return { type: SET_MOVIES, value };
}
export function setFilter( value ) {
  return { type: SET_FILTER, value };
}
export function setUser( value ) {
  return { type: SET_USER, value };
}
export function updateUser( value ) {
  return { type: UPDATE_USER, value };
}
export function unregUser( value ) {
  return { type: UNREG_USER, value };
}
export function setSort( value ) {
  return { type: SET_SORT, value };
}
export function togglePw( value ) {
  return { type: TOGGLE_PW, value };
}
export function setGenre( value ) {
  return { type: SET_GENRE, value };
}
export function setDirector( value ) {
  return { type: SET_DIRECTOR, value };
}