import { 
    CHANGE_CITY_FIELD, 
    FETCH_CITIES_FAILURE, 
    FETCH_CITIES_REQUEST, 
    FETCH_CITIES_SUCCESS, 
    FETCH_LAST_ROUTES_FAILURE, 
    FETCH_LAST_ROUTES_REQUEST, 
    FETCH_LAST_ROUTES_SUCCESS, 
    FETCH_ROUTES_FAILURE, 
    FETCH_ROUTES_REQUEST, 
    FETCH_ROUTES_SUCCESS, 
    SET_ROUTE_SETTING, 
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
            if (value && value !== '0:00' && value !== '24:00') {
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