import { 
    CHANGE_CITY_FIELD, 
    CHANGE_EMAIL_FIELD, 
    FETCH_CITIES_FAILURE, 
    FETCH_CITIES_REQUEST, 
    FETCH_CITIES_SUCCESS, 
    FETCH_EMAIL_FAILURE, 
    FETCH_EMAIL_REQUEST, 
    FETCH_EMAIL_SUCCESS, 
    FETCH_LAST_ROUTES_FAILURE, 
    FETCH_LAST_ROUTES_REQUEST, 
    FETCH_LAST_ROUTES_SUCCESS, 
    FETCH_ROUTES_FAILURE, 
    FETCH_ROUTES_REQUEST, 
    FETCH_ROUTES_SUCCESS, 
    SET_CURRENT_PAGE, 
    SET_ROUTE_SETTING, 
    SET_TRAIN, 
    SWAP_CITIES 
} from "./actionTypes";

export const changeCityField = (name, value) => ({
    type: CHANGE_CITY_FIELD,
    payload: {
        name,
        value,
    },
});

export const swapCities = () => ({
    type: SWAP_CITIES,
})

export const fetchCitiesRequest = () => ({
    type: FETCH_CITIES_REQUEST,
});
  
export const fetchCitiesFailure = error => ({
    type: FETCH_CITIES_FAILURE,
    payload: {
        error,
    },
});
  
export const fetchCitiesSuccess = (direction, items) => ({
    type: FETCH_CITIES_SUCCESS,
    payload: {
        direction,
        items,
    },
});

export const setRouteSetting = (name, value) => ({
    type: SET_ROUTE_SETTING,
    payload: {
        name,
        value,
    },
})

export const fetchRoutesRequest = () => ({
    type: FETCH_ROUTES_REQUEST,
});
  
export const fetchRoutesFailure = error => ({
    type: FETCH_ROUTES_FAILURE,
    payload: {
        error,
    },
});
  
export const fetchRoutesSuccess = (data) => ({
    type: FETCH_ROUTES_SUCCESS,
    payload: {
        data,
    },
});

export const fetchLastRoutesRequest = () => ({
    type: FETCH_LAST_ROUTES_REQUEST,
});
  
export const fetchLastRoutesFailure = error => ({
    type: FETCH_LAST_ROUTES_FAILURE,
    payload: {
        error,
    },
});
  
export const fetchLastRoutesSuccess = data => ({
    type: FETCH_LAST_ROUTES_SUCCESS,
    payload: {
        data,
    },
});

export const changeEmailField = (value) => ({
    type: CHANGE_EMAIL_FIELD,
    payload: {
        value,
    },
});

export const fetchEmailRequest = () => ({
    type: FETCH_EMAIL_REQUEST,
});
  
export const fetchEmailFailure = error => ({
    type: FETCH_EMAIL_FAILURE,
    payload: {
        error,
    },
});
  
export const fetchEmailSuccess = () => ({
    type: FETCH_EMAIL_SUCCESS,
});

export const setCurrentPage = number => ({
    type: SET_CURRENT_PAGE,
    payload: {
        number,
    },
});

export const setTrain = route => ({
    type: SET_TRAIN,
    payload: {
        route,
    },
});


export const fetchCities = (nameList, search) => async (dispatch) => {
    dispatch(fetchCitiesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}routes/cities?name=${search}`);
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        console.log(data);
        dispatch(fetchCitiesSuccess(nameList, data));
    } catch (e) {
        dispatch(fetchCitiesFailure(e.message));
    }
}

export const fetchRoutes = data => async (dispatch) => {
    dispatch(fetchRoutesRequest());
    try {
        let dataUrl = '';
        for (let item in data) {
            let value = data[item];
            if (value && value !== 0 && value !== 24) {
                dataUrl += `&${item}=${value}&`;
            }
        }
        const response = await fetch(`${process.env.REACT_APP_API_URL}routes?${dataUrl}`);
        if (!response.ok) {
        throw new Error(response.statusText);
    }
    const reguest = await response.json();
    console.log(reguest);
    dispatch(fetchRoutesSuccess(reguest));
    } catch (e) {
        dispatch(fetchRoutesFailure(e.message));
    }
}

export const fetchLastRoutes = () => async (dispatch) => {
    dispatch(fetchLastRoutesRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}routes/last`);
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        console.log(data);
        dispatch(fetchLastRoutesSuccess(data));
    } catch (e) {
        dispatch(fetchLastRoutesFailure(e.message));
    }
}

export const fetchEmail = email => async (dispatch) => {
    dispatch(fetchEmailRequest());
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}subscribe?email=${email}`, {
            method: "POST",
        });
        if (!response.ok) {
        throw new Error(response.statusText);
    }
        const data = await response.json();
        console.log(data);
        dispatch(fetchEmailSuccess());
    } catch (e) {
        dispatch(fetchEmailFailure(e.message));
    }
}