import { CLOSE_ERROR, SET_ERROR } from "../actions/actionTypes";

const initialState = {
    error: false,
    info: false,
    messageMain: "", 
    messageDetails: "",
    type: "",
}

export default function showMessagesReducer(state = initialState, action) {
    switch (action.type) {
        case SET_ERROR: 
        const { messageMain, messageDetails, type } = action.payload;
            return {
                ...state,
                error: true,
                messageMain,
                messageDetails,
                type,
            };
        case CLOSE_ERROR:
            return {
                ...state,
                error: false,
                messageMain: "", 
                messageDetails: "",
                type: "",
            }
        default:
            return state;
    }
}