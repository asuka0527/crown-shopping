import { ShopActionTypes } from "./shop.types";

// [ UTILIZED converted SHOP DATA from firebase ] 1).
const INITIAL_STATE = {
  collections: null,

  // [ REDUX THUNK - handling asyncronous data fetching / request API ]  1). Reducers needs to know whether we our fething data data in our collections database
  isFetching: false,
  errorMessage: undefined,
};

const shopReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    // [ REDUX THUNK - handling asyncronous data fetching / request API ] 2). Setup  how the actions handle by our reducer
    case ShopActionTypes.FETCH_COLLECTIONS_START:
      return {
        ...state,
        isFetching: true,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        collections: actions.payload,
      };
    case ShopActionTypes.FETCH_COLLECTIONS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: actions.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
