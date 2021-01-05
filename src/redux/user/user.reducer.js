import { UserActionTypes } from "./user.types";

// default value
const INITIAL_STATE = {
  currentUser: null,
};

// reducer ( currentState, action) => {swtich statement}
// use default value
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
