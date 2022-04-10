import { 
    FETCH_ROUTES_FAILURE, 
    FETCH_ROUTES_REQUEST, 
    FETCH_ROUTES_SUCCESS, 
    SET_ROUTE_SETTING 
} from "../actions/actionTypes";

const initialState = {
    routeSet: {
        from_city_id: '',
        to_city_id: '',
        date_start: '',
        date_end: '',
        date_start_arrival: null,
        date_end_arrival: null,
        have_first_class: false,
        have_second_class: false,
        have_third_class: false,
        have_fourth_class: false,
        have_wifi: false,
        have_air_conditioning: false,
        have_express: false,
        price_from: '',
        price_to: '',
        start_departure_hour_from: '0:00',
        start_departure_hour_to: '24:00',
        start_arrival_hour_from: '0:00',
        start_arrival_hour_to: '24:00',
        end_departure_hour_from: '0:00',
        end_departure_hour_to: '24:00',
        end_arrival_hour_from: '0:00',
        end_arrival_hour_to: '24:00',
        limit: 5,
        offset: 0,
        sort: 'date',
    },
    routes: {
        total_count: 0,
        items: [],
    },
    loadingStatus: 'idle',
    error: null,
}

export default function routeSettingsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ROUTE_SETTING:
            const { name, value } = action.payload;
            const { routeSet } = state;
            return {
                ...state,
                routeSet: {
                    ...routeSet,
                    [name]: value,
                } 
            } 
        case FETCH_ROUTES_REQUEST:
            return {
                ...state,
                loadingStatus: 'pending',
            };
        case FETCH_ROUTES_FAILURE:
            const {error} = action.payload;
            return {
                ...state,
                loadingStatus: 'error',
                error,
            };
        case FETCH_ROUTES_SUCCESS:
            const { data } = action.payload;
            const { routes } = state;
            return {
                ...state,
                routes: {
                    ...routes,
                    total_count: data.total_count,
                    items:  data.items,
                },
                loadingStatus: 'success',
            };

        default:
            return state;
    }
}