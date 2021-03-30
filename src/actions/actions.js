//define action-types
export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGOUT_USER = 'LOGOUT_USER';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const UNREG_USER = 'UNREG_USER';
export const ADD_FAV = 'ADD_FAV';
export const REMOVE_FAV = 'REMOVE_FAV';
export const SET_SORT = 'SET_SORT';
export const TOGGLE_PW = 'TOGGLE_PW';

//define action creators
export function setMovies( value ) {
  return { type: SET_MOVIES, value };
}
export function setFilter( value ) {
  return { type: SET_FILTER, value };
}
export function loginUser( value ) {
  return { type: LOGIN_USER, value };
}
export function logoutUser( value ) {
  return { type: LOGOUT_USER, value };
}
export function addUser( value ) {
  return { type: ADD_USER, value };
}
export function updateUser( value ) {
  return { type: UPDATE_USER, value };
}
export function unregUser( value ) {
  return { type: UNREG_USER, value };
}
export function addFav( value ) {
  return { type: ADD_FAV, value };
}
export function removeFav( value ) {
  return { type: REMOVE_FAV, value };
}
export function setSort( value ) {
  return { type: SET_SORT, value };
}
export function togglePw( value ) {
  return { type: TOGGLE_PW, value };
}