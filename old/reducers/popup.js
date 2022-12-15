import {
  POPUP_OPEN,
  POPUP_CLOSE,
} from '../actions/actionTypes'

const initialState = {
  opened: false, popup: null, title: null,
};

export default function popupReducer(state = initialState, action) {
  switch (action.type) {
    case POPUP_OPEN:
      const { data: {popup, title} } = action.payload;
      return { ...state, opened: true, title, popup }
    case POPUP_CLOSE:
      return { ...state, opened: false, title: null, popup: null }
    default:
      return state;
  }
}
