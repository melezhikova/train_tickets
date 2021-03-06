import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AvailableSeats from "./AvailableSeats";
import { format } from "date-fns";
import { setTrain } from "../actions/actionCreators";

function Routes () {
    const { routes } = useSelector(state => state.routeSettings);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const chooseTrain = route => {
        dispatch(setTrain(route));
        navigate('/seats');
    }

    return (
        <section className="routes">
            {routes.items.map(o => (
                <div className="routes_routeContainer" key={o.departure._id}>
                    <div className="routes_routeContainerLeftSide">
                        <div className="routes_routeTrainPicBorder">
                            <div className="routes_routeTrainPic routes_routeTrainPic_trainStart"></div>
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
                            <div className="routes_timingRow">
                                <div className="routes_timingItinerary">
                                    <div className="routes_timingTime">{format(new Date(o.departure.from.datetime * 1000),'hh:mm')}</div>
                                    <div className="routes_timingCity">{o.departure.from.city.name}</div>
                                    <div className="routes_timingStation">{o.departure.from.railway_station_name}</div>
                                </div>
                                <div className="routes_duration">
                                    <div className="routes_durationTime">
                                        <div className="routes_durationTime">{`${Math.trunc(o.departure.duration / 3600)}:${((o.departure.duration % 3600) / 60) < 10 ? `0${(o.departure.duration % 3600) / 60}` : (o.departure.duration % 3600) / 60}`}</div>
                                    </div>
                                    <div className="routes_yellowArrowPic routes_yellowArrowPic_trainStart"></div>
                                </div>
                                <div className="routes_timingItinerary">
                                    <div className="routes_timingTime">{format(new Date(o.departure.to.datetime * 1000), 'hh:mm')}</div>
                                    <div className="routes_timingCity">{o.departure.to.city.name}</div>
                                    <div className="routes_timingStation">{o.departure.to.railway_station_name}</div>
                                </div>
                            </div>
                            <div className="routes_timingRow">
                                <div className="routes_timingItinerary">
                                    <div className="routes_timingTime">{format(new Date(o.departure.from.datetime * 1000),'hh:mm')}</div>
                                    <div className="routes_timingCity">{o.departure.from.city.name}</div>
                                    <div className="routes_timingStation">{o.departure.from.railway_station_name}</div>
                                </div>
                                <div className="routes_duration">
                                    <div className="routes_durationTime">
                                        <div className="routes_durationTime">{`${Math.trunc(o.departure.duration / 3600)}:${((o.departure.duration % 3600) / 60) < 10 ? `0${(o.departure.duration % 3600) / 60}` : (o.departure.duration % 3600) / 60}`}</div>
                                    </div>
                                    <div className="routes_yellowArrowPic routes_yellowArrowPic_trainEnd"></div>
                                </div>
                                <div className="routes_timingItinerary">
                                    <div className="routes_timingTime">{format(new Date(o.departure.to.datetime * 1000), 'hh:mm')}</div>
                                    <div className="routes_timingCity">{o.departure.to.city.name}</div>
                                    <div className="routes_timingStation">{o.departure.to.railway_station_name}</div>
                                </div>
                            </div>
                        </div>
                        <div className="routes_seats">
                            {o.departure.available_seats_info.fourth && 
                                <AvailableSeats type="??????????????" quantity={o.departure.available_seats_info.fourth} price={o.departure.price_info.fourth.bottom_price} />
                            }
                            {o.departure.available_seats_info.third && 
                                <AvailableSeats type="????????????????" quantity={o.departure.available_seats_info.third} price={o.departure.price_info.third.bottom_price}
                                top={o.departure.price_info.third.top_price} bottom={o.departure.price_info.third.bottom_price} side={o.departure.price_info.third.side_price} />
                            }
                            {o.departure.available_seats_info.second && 
                                <AvailableSeats type="????????" quantity={o.departure.available_seats_info.second} price={o.departure.price_info.second.bottom_price} 
                                top={o.departure.price_info.second.top_price} bottom={o.departure.price_info.second.bottom_price}/>
                            }
                            {o.departure.available_seats_info.first && 
                                <AvailableSeats type="????????" quantity={o.departure.available_seats_info.first} price={o.departure.price_info.first.bottom_price} />
                            }
                            <div className="routesServicesPics"></div>
                            <button onClick={() => chooseTrain(o)} className="yellowBtn routesBtn">?????????????? ??????????</button>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default Routes;