import {
  UPDATE_STATE,
} from '../actions/actionTypes'

const initialState = {
};

export default function webStateReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STATE:
    const {data} = action.payload;
      return { ...state, ...data };
    default:
      return state;
  }
}
