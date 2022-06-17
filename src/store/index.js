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
import passengersReducer from '../reducers/passengers';
import routeSettingsReducer from '../reducers/routeSettings';
import seatsReducer from '../reducers/seats';
import showMessagesReducer from '../reducers/showMessages';
import userReducer from '../reducers/user';

const reducer = combineReducers({
    cities: citiesReducer,
    routeSettings: routeSettingsReducer,
    lastRoutes: lastRoutesReducer,
    email: emailReducer,
    seats: seatsReducer,
    user: userReducer,
    passengers: passengersReducer,
    showMessages: showMessagesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk)),
);

export default store;