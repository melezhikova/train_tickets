import { 
    CHANGE_PASSENGER_FIELD,
    SET_NEW_PASSENGER,
    SET_PASSENGER_COMPLETE,
} from "../actions/actionTypes";

const initialState = {
    passengers: [],
}

export default function passengersReducer(state = initialState, action) {
    const { passengers } = state;
    switch (action.type) {
        case SET_NEW_PASSENGER:
            const { number } = action.payload;
            if (passengers.length === 0) {
                return {
                    ...state,
                    passengers: [{
                        number,
                        is_adult: true,
                        first_name: "",
                        last_name: "",
                        patronymic: "",
                        gender: true,
                        birthday: "",
                        document_type: "Паспорт",
                        documentSeries: "",
                        documentNumber: "",
                        complete: false,
                    }],
                }
            } else {
                return {
                    ...state,
                    passengers: [...passengers, {
                        number,
                        is_adult: true,
                        first_name: "",
                        last_name: "",
                        patronymic: "",
                        gender: true,
                        birthday: "",
                        document_type: "Паспорт",
                        documentSeries: "",
                        documentNumber: "",
                        complete: false,
                    }],
                }
            }
        case CHANGE_PASSENGER_FIELD:
            const { name, value, passNumber } = action.payload;
            const index = passengers.findIndex(item => item.number === passNumber);
            if (index !== -1) {
                passengers[index][name] = value;
                passengers[index].complete = false;
                return {
                    ...state,
                    passengers: [...passengers],
                }
            }
        case SET_PASSENGER_COMPLETE:
            const { idx } = action.payload;
            passengers[idx].complete = true;
            return {
                ...state,
                passengers: [...passengers],
            }
        default:
            return state;
    }
}