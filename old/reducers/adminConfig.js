import {
  CFG_REQUEST, CFG_SUCCESS, CFG_FAILURE,
} from '../actions/actionTypes'

const initialState = {};

export default function adminConfigReducer(state = initialState, action) {
  if (!action.hasOwnProperty('payload')) return state;
  const {type} = action.payload;

  switch (action.type) {
    case CFG_REQUEST:
      return { ...state, [type]: {
        data: [], loading: true, error: null,
      }};
    case CFG_FAILURE:
      const {error} = action.payload;
      return { ...state, [type]: {
        data: [], loading: false, error,
      }};
    case CFG_SUCCESS:
      const {data} = action.payload;
      return { ...state, [type]: {
        data, error: null, loading: false,
      }};
    default:
      return state;
  }
}
