import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose,
} from 'redux';
import thunk from 'redux-thunk';
import citiesReducer from "../reducers/cities";
import emailReducer from '../reducers/email';
import lastRoutesReducer from '../reducers/lastRoutes';
import routeSettingsReducer from '../reducers/routeSettings';
import seatsReducer from '../reducers/seats';
import userReducer from '../reducers/user';

const reducer = combineReducers({
    cities: citiesReducer,
    routeSettings: routeSettingsReducer,
    lastRoutes: lastRoutesReducer,
    email: emailReducer,
    seats: seatsReducer,
    user: userReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)),
);

export default store;