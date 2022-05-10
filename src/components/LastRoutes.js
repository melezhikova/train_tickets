import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLastRoutes } from "../actions/actionCreators";

function LastRoutes () {

    const { lastRoutes } = useSelector(state => state.lastRoutes);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(lastRoutes);
        dispatch(fetchLastRoutes()).then (console.log(lastRoutes));
    },[]);

    return (
        <section className="lastRoutes">
            <div className="sectionHeader">ПОСЛЕДНИЕ БИЛЕТЫ</div>
            {lastRoutes.length > 0 && <div className="lastRoutesBox">
                {lastRoutes.map(o => (
                    <div key={o.departure._id} className="lastRouteItem">
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
                                <div className="lastRouteDetailsPriceFigure">{o.min_price}</div>
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