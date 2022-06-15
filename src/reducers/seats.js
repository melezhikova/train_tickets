import { 
    CHANGE_QUANTITY_FIELD,
    FETCH_SEATS_FAILURE,
    FETCH_SEATS_REQUEST,
    FETCH_SEATS_SUCCESS,
    SET_CHOOSEN_SEAT,
    SET_TRAIN
} from "../actions/actionTypes";

const initialState = {
    route: null,
    seats: null,
    choosenSeats: [],
    loadingStatus: 'idle',
    error: null,
    quantity: {
        total: 1,
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
        case SET_CHOOSEN_SEAT:
            const { index, coach } = action.payload;
            console.log(index, coach);
            const { choosenSeats } = state;
            if (choosenSeats.length === 0) {
                return {
                    ...state,
                    choosenSeats: [{coach, seats: [index]}],
                }
            } else {
                const idx = choosenSeats.findIndex(item => item.coach === coach);
                if (idx === -1) {
                    return {
                        ...state,
                        choosenSeats: [...choosenSeats, {coach, seats: [index]}],
                    }
                } else {
                    if (choosenSeats[idx].seats.includes(index)) {
                        console.log(choosenSeats[idx].seats);
                        return {
                            ...state,
                            choosenSeats: [{...choosenSeats[idx],
                                seats: choosenSeats[idx].seats.filter(item => item !== index)}]
                        }
                    } else {
                        return {
                            ...state,
                            choosenSeats: [{...choosenSeats[idx],
                                seats: [...choosenSeats[idx].seats, index]}]
                        }
                    }
                }
            }
        default:
            return state;
    }
}