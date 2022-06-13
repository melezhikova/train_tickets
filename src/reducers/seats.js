import { 
    CHANGE_QUANTITY_FIELD,
    FETCH_SEATS_FAILURE,
    FETCH_SEATS_REQUEST,
    FETCH_SEATS_SUCCESS,
    SET_PASSENGER,
    SET_TRAIN
} from "../actions/actionTypes";

const initialState = {
    route: null,
    seats: null,
    loadingStatus: 'idle',
    error: null,
    quantity: {
        total: 1,
        adultQuantity: 1,
        childQuantity: 0,
        childWithoutSeatQuantity: 0
    },
    passengers: [],
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
        case SET_PASSENGER:
            const { passenger } = action.payload;
            const { passengers } = state;
            let index;
            if (passengers.length > 0) {
                index = passengers.findIndex(item => item.number === passenger.number);
                if (index !== -1) {
                    return {
                        ...state,
                        passengers: passengers[index] = passenger, 
                    }
                }   else {
                    return {
                        ...state,
                        passengers: [...passengers, passenger],
                    }
                }
            } else {
                return {
                    ...state,
                    passengers: [passenger],
                }
            }
        default:
            return state;
    }
}