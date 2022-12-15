import {
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from '../actions/actionTypes'

const initialState = {
  logged: false, loading: false, error: null, user: null,
};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
    const {login, password} = action.payload;
    console.log(login, password);
      return { ...state, loading: true, error: null, user: {
        email: login,
        password: null,
      }};
    case LOGIN_FAILURE:
      const {error} = action.payload;
      console.log(error);
      return { ...state, user: null, logged: false, loading: false, error }
    case LOGIN_SUCCESS:
      return { ...state, logged: true, loading: false, error: null }
    default:
      return state;
  }
}
