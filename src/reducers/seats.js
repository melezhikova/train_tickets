import { 
    SET_TRAIN
} from "../actions/actionTypes";

const initialState = {
    route: null,
    loadingStatus: 'idle',
    error: null,
}

export default function seatsReducer(state = initialState, action) {
    switch (action.type) {
        case SET_TRAIN:
            const { route } = action.payload;
            return {
                ...state,
                train: route,
            };
        default:
            return state;
    }
}