import { 
    CHANGE_QUANTITY_FIELD,
    FETCH_SEATS_FAILURE,
    FETCH_SEATS_REQUEST,
    FETCH_SEATS_SUCCESS,
    SET_TRAIN
} from "../actions/actionTypes";

const initialState = {
    route: null,
    seats: null,
    loadingStatus: 'idle',
    error: null,
    quantity: {
        adultQuantity: 1,
        childQuantity: 0,
        childWithoutSeatQuantity: 0
    },
}

export default function seatsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRAIN:
            const { route } = action.payload;
            return {
                ...state,
                route: route,
            };
        case CHANGE_QUANTITY_FIELD:
            const { name, value } = action.payload;
            const { quantity } = state;
            console.log(name, value);
            return {
                ...state,
                quantity: {
                    ...quantity,
                    [name]: value,
                } 
            };
        case FETCH_SEATS_REQUEST:
            return {
                ...state,
                loadingStatus: 'pending',
            };
        case FETCH_SEATS_FAILURE:
            const {error} = action.payload;
            return {
                ...state,
                loadingStatus: 'error',
                error,
            };
        case FETCH_SEATS_SUCCESS:
            const { data } = action.payload;
            return {
                ...state,
                seats: data,
                loadingStatus: 'success',
            };
        default:
            return state;
    }
}