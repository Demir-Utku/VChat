import {
  GET_MESSAGES_SUCCESS,
  GET_ROOM_START,
  GET_ROOM_SUCCESS,
  GET_ROOM_FAILED,
  GET_ALL_USER_START,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILED,
} from '../actions/types';

const INITIAL_STATE = {
  loadingGetRoom: false,
  rooms: [],

  loadingUsers: false,
  allUsers: [],

  getMessages: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ROOM_START:
      return {
        ...state,
        loadingGetRoom: true,
      };
    case GET_ROOM_SUCCESS:
      return {
        ...state,
        loadingGetRoom: false,
        rooms: action.payload,
      };
    case GET_ROOM_FAILED:
      return {
        ...state,
        loadingGetRoom: false,
      };

    case GET_ALL_USER_START:
      return {
        ...state,
        loadingUsers: true,
      };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        loadingUsers: false,
        allUsers: action.payload,
      };
    case GET_ALL_USER_FAILED:
      return {
        ...state,
        loadingUsers: false,
      };

    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        getMessages: action.payload,
      };

    default:
      return state;
  }
};
