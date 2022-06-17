import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCityField, fetchLastRoutes, fetchRoutes, setRouteSetting } from "../actions/actionCreators";

function LastRoutes () {

    const { lastRoutes } = useSelector(state => state.lastRoutes);
    const { routeSet } = useSelector(state => state.routeSettings);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchLastRoutes());
    },[]);

    const getTickets = (from, to, fromCityId, toCityId) => {
        dispatch(changeCityField('cityFrom', from));
        dispatch(changeCityField('cityTo', to));
        dispatch(setRouteSetting('from_city_id', fromCityId));
        dispatch(setRouteSetting('to_city_id', toCityId));
        dispatch(fetchRoutes(routeSet));
        console.log(routeSet);
    }

    return (
        <section className="lastRoutes">
            <div className="sectionHeader">ПОСЛЕДНИЕ БИЛЕТЫ</div>
            {lastRoutes.length > 0 && <div className="lastRoutesBox">
                {lastRoutes.map(o => (
                    <div key={o.departure._id} className="lastRouteItem" 
                    onClick={() => getTickets(
                        o.departure.from.city.name, 
                        o.departure.to.city.name, 
                        o.departure.from.city._id,
                        o.departure.to.city._id,
                    )}>
                        <div className="lastRouteCities">
                            <div>{o.departure.from.city.name}</div>
                            <div>{o.departure.to.city.name}</div>
                        </div>
                        <div className="lastRouteStations">
                            <div className="lastRouteStationsFrom">{o.departure.from.railway_station_name}</div>
                            <div className="lastRouteStationsTo">{o.departure.to.railway_station_name}</div>
                        </div>
                        <div className="lastRouteDetails">
                            <div className="lastRouteDetailsPics"></div>
                            <div className="lastRouteDetailsPrice">
                                <div>от</div>
                                <div className="lastRouteDetailsPriceFigure">{o.min_price.toLocaleString()}</div>
                                <div className="lastRouteDetailsPriceСurrency"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>}
        </section>
    )
}

export default LastRoutes;