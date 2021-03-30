import { combineReducers } from 'redux';

import {
  SET_MOVIES,
  SET_FILTER,
  LOGIN_USER,
  LOGOUT_USER,
  ADD_USER,
  UPDATE_USER,
  UNREG_USER,
  ADD_FAV,
  REMOVE_FAV,
  SET_SORT,
  TOGGLE_PW
} from '../actions/actions';

function visibilityFilter( state = '', action ) {
  switch ( action.type ) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}
function movies( state = [], action ) {
  switch ( action.type ) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}
function login( state = '', action ) {
  switch ( action.type ) {
    case LOGIN_USER:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers( {
  visibilityFilter,
  movies,
  login
} );

export default moviesApp;