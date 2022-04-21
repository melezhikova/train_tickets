import { useSelector, useDispatch } from "react-redux";
import AvailableSeats from "./AvailableSeats";
import { format } from "date-fns";
import { useEffect } from "react";
import { fetchRoutes } from "../actions/actionCreators";

function Routes () {
    const { routes, routeSet } = useSelector(state => state.routeSettings);
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(fetchRoutes(routeSet));
    },[routeSet])

    return (
        <section className="routes">
            {routes.items.map(o => (
                <div className="routes_routeContainer" key={o.departure._id}>
                    <div className="routes_routeContainerLeftSide">
                        <div className="routes_routeTrainPicBorder">
                            <div className="routes_routeTrainPic"></div>
                        </div>
                        <div className="routes_routeName">{o.departure.train.name}</div>
                        <div className="routes_routeItinerary">
                            <div className="routes_routeItineraryFromBox">
                                <div>{o.departure.from.city.name}</div>
                                <div className="routes_routeItineraryAroow"></div>
                            </div>
                            <div>{o.departure.to.city.name}</div>
                        </div>
                    </div>
                    <div className="routes_routeDetails">
                        <div className="routes_timing">
                            <div className="routes_timingItinerary">
                                <div className="routes_timingTime">{format(new Date(o.departure.from.datetime), 'mm:ss')}</div>
                                <div className="routes_timingCity">{o.departure.from.city.name}</div>
                                <div className="routes_timingStation">{o.departure.from.railway_station_name}</div>
                            </div>
                            <div className="routes_duration">
                                <div className="routes_durationTime">{`${Math.trunc(o.departure.duration / 3600)}:${(o.departure.duration % 3600) / 60}`}</div>
                                <div className="routes_yellowArrowPic"></div>
                            </div>
                            <div className="routes_timingItinerary">
                                <div className="routes_timingTime">{format(new Date(o.departure.to.datetime), 'mm:ss')}</div>
                                <div className="routes_timingCity">{o.departure.to.city.name}</div>
                                <div className="routes_timingStation">{o.departure.to.railway_station_name}</div>
                            </div>
                        </div>
                        <div className="routes_seats">
                            {o.departure.available_seats_info.fourth && 
                                <AvailableSeats type="Сидячий" quantity={o.departure.available_seats_info.fourth} price={o.departure.price_info.fourth.bottom_price} />
                            }
                            {o.departure.available_seats_info.third && 
                                <AvailableSeats type="Плацкарт" quantity={o.departure.available_seats_info.third} price={o.departure.price_info.third.bottom_price} />
                            }
                            {o.departure.available_seats_info.second && 
                                <AvailableSeats type="Купе" quantity={o.departure.available_seats_info.second} price={o.departure.price_info.second.bottom_price} />
                            }
                            {o.departure.available_seats_info.first && 
                                <AvailableSeats type="Люкс" quantity={o.departure.available_seats_info.first} price={o.departure.price_info.first.bottom_price} />
                            }
                            <button className="routesBtn btn">Выбрать места</button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Routes;