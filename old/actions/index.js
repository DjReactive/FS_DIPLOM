import {
  // Auth
  LOGIN_REQUEST,  LOGIN_FAILURE,  LOGIN_SUCCESS,
  //Popup
  POPUP_OPEN, POPUP_CLOSE,
  // UpdateState
  UPDATE_STATE,
  // Admin Config
  CFG_REQUEST, CFG_SUCCESS, CFG_FAILURE

} from'./actionTypes';

// Auth
export const loginRequest = (login, password) => (
  {type: LOGIN_REQUEST, payload: {login, password}, }
);
export const loginSuccess = () => (
  {type: LOGIN_SUCCESS, }
);
export const loginFailure = (error) => (
  {type: LOGIN_FAILURE, payload: {error}, }
);
// Popup
export const popupOpen = (data) => (
  {type: POPUP_OPEN, payload: {data}, }
);
export const popupClose = () => (
  {type: POPUP_CLOSE, }
);
// Update state
export const updateState = (data) => (
  {type: UPDATE_STATE, payload: {data}, }
);
// Admin Configs
export const adminCfgRequest = (type) => (
  {type: CFG_REQUEST, payload: {type}, }
);
export const adminCfgSuccess = (type, data) => (
  {type: CFG_SUCCESS, payload: {type, data}, }
);
export const adminCfgFailure = (type, error) => (
  {type: CFG_FAILURE, payload: {type, error}, }
);
