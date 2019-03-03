import {
  FETCH_USER_PROFILE,
  FETCH_USERS,
} from '../actions/types/index';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_USERS:{
      return { ...state,list: action.payload};
    }
    case FETCH_USER_PROFILE:{
      return { ...state,profile: action.payload};
    }
  }

  return state;
}
