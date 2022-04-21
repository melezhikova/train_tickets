import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { changeCityField, fetchCities, fetchRoutes, setRouteSetting, swapCities } from "../actions/actionCreators";
import { useEffect, useState } from "react";
import { format } from "date-fns";


function HeaderForm (props) {

    const { typeForm, lines } = props;
    const { cityFrom, cityTo, citiesListFrom, citiesListTo } = useSelector(state => state.cities);
    const { routeSet } = useSelector(state => state.routeSettings);
    const [ inFocus, setFocus ] = useState({from: false, to: false});
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(citiesListFrom, citiesListTo);
        if (citiesListFrom.length > 0) {
            const fromCityInList = citiesListFrom.findIndex(o => o.name === cityFrom);
            if (fromCityInList !== -1) {
                const fromCityId = citiesListFrom[fromCityInList]._id;
                dispatch(setRouteSetting('from_city_id', fromCityId));
            }
        }
        if (citiesListTo.length > 0) {
            const toCityInList = citiesListTo.findIndex(o => o.name === cityTo);
            if (toCityInList !== -1) {
                const toCityId = citiesListTo[toCityInList]._id;
                dispatch(setRouteSetting('to_city_id', toCityId));
            }
        }
    },[citiesListFrom, citiesListTo, cityFrom, cityTo])

    const handleSubmit = evt => {
        evt.preventDefault();
        navigate('/tickets');
        dispatch(fetchRoutes(routeSet));
    }

    const handleChangeCity = evt => {
        const {name, value} = evt.target;
        dispatch(changeCityField(name, value));
        if (name === 'cityFrom') {
            setFocus(prevState => ({...prevState, from: true, to: false}));
            dispatch(fetchCities('citiesListFrom', value))
        } else if (name === 'cityTo') {
            setFocus(prevState => ({...prevState, from: false, to: true}));
            dispatch(fetchCities('citiesListTo', value))
        } else {
            setFocus(prevState => ({...prevState, from: false, to: false}));
        }

    };

    const handleChangeDate = evt => {
        const {name, value} = evt.target;
        const newValue = format(new Date(value), 'yyyy-MM-dd');
        dispatch(setRouteSetting(name, newValue));
    }

    const swapDirection = () => {
        dispatch(swapCities());
    }

    const chooseCity = (direction, city) => {
        dispatch(changeCityField(direction, city));
        setFocus(prevState => ({...prevState, from: false, to: false}));
    }

    return (
        <form className={typeForm} onSubmit={handleSubmit}>
            <div className={lines}>
                <div>
                    <div className="formDiscription">Направление</div>
                    <div className="inputGroup">
                        <div className="directionInput">
                            <input onChange={handleChangeCity} name="cityFrom" autoComplete="off" className="formControl" placeholder="Откуда" value={cityFrom} required />
                            {citiesListFrom.length > 0 && inFocus.from &&
                                <ul className="directionsList">
                                    {citiesListFrom.map(o => (
                                        <li onClick={() => chooseCity('cityFrom', o.name)} key={o._id} className="directionsListItem">{o.name}</li>
                                    ))}
                                </ul>
                            }
                        </div>
                        <div onClick={swapDirection} className="swapDirection"></div>
                        <div className="directionInput">
                            <input onChange={handleChangeCity} name="cityTo" autoComplete="off" className="formControl" placeholder="Куда" value={cityTo} required />
                            {citiesListTo.length > 0 &&  inFocus.to &&
                                <ul className="directionsList">
                                    {citiesListTo.map(o => (
                                        <li onClick={() => chooseCity('cityTo', o.name)} key={o._id} className="directionsListItem">{o.name}</li>
                                    ))}
                                </ul>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <div className="formDiscription">Дата</div>
                    <div className="inputGroup">
                        <div className="dateInput">
                            <input onChange={handleChangeDate} type="date" name="date_start" value={routeSet.date_start} className="formControl" placeholder="ДД/ММ/ГГ" />
                        </div>
                        <div className="dateInput">
                            <input onChange={handleChangeDate} type="date" name="date_end" value={routeSet.date_end} className="formControl" placeholder="ДД/ММ/ГГ" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="btnBox">
                <button className="searchBtn btn">НАЙТИ БИЛЕТЫ</button>
            </div>
        </form>
    )
}

export default HeaderForm;