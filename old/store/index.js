import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import loginReducer from '../reducers/auth'
import popupReducer from '../reducers/popup'
import webStateReducer from '../reducers/state'
import adminConfigReducer from '../reducers/adminConfig'
import createSagaMiddleware from 'redux-saga';
import saga from '../sagas'

const reducer = combineReducers({
  userAuthorize: loginReducer,
  popupWindow: popupReducer,
  adminConfigReducer,
  webStateReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(saga);
export default store;
