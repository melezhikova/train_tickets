import { useSelector } from "react-redux";
import { format } from "date-fns";

function TrainDetails (props) {
    const { direction } = props;
    const { route } = useSelector(state => state.seats);

    return (
        <div className="train_routeContainer">
            <div className="train_routeTrainPic"></div>
            <div className="train_routePath">
                <div className="train_routeName">{route.departure.train.name}</div>
                <div className="train_routeItinerary">
                    <div className="routes_routeItineraryFromBox">
                        <div>{route.departure.from.city.name}</div>
                        <div className="routes_routeItineraryAroow"></div>
                    </div>
                    <div>{route.departure.to.city.name}</div>
                </div>
            </div>
            <div className="train_routeDetails">
                <div className="routes_timingItinerary">
                    <div className="routes_timingTime">{format(new Date(route.departure.from.datetime * 1000),'hh:mm')}</div>
                    <div className="routes_timingCity">{route.departure.from.city.name}</div>
                    <div className="routes_timingStation">{route.departure.from.railway_station_name}</div>
                </div>    
                <div className={`routes_yellowArrowPic routes_yellowArrowPic_${direction}`}></div>
                <div className="routes_timingItinerary">
                    <div className="routes_timingTime">{format(new Date(route.departure.to.datetime * 1000), 'hh:mm')}</div>
                    <div className="routes_timingCity">{route.departure.to.city.name}</div>
                    <div className="routes_timingStation">{route.departure.to.railway_station_name}</div>
                </div>
            </div>
            <div className="train_duration">
                <div className="train_watch"></div>
                <div className="train_durationTime">
                    <div>{`
                        ${Math.trunc(route.departure.duration / 3600)}
                        ${Math.trunc(route.departure.duration / 3600) > 4 && Math.trunc(route.departure.duration / 3600) < 20 ? "часов" :
                        (Math.trunc(route.departure.duration / 3600)) % 10 === 1 ? "час" :
                        (Math.trunc(route.departure.duration / 3600)) % 10 > 1 && (Math.trunc(route.departure.duration / 3600)) % 10 < 5 ? "часа" : "часов"}
                    `}</div>
                    <div>{`
                        ${(route.departure.duration % 3600) / 60} 
                        ${((route.departure.duration % 3600) / 60) > 4 && ((route.departure.duration % 3600) / 60) < 20 ? "минут" :
                        ((route.departure.duration % 3600) / 60) % 10 === 1 ? "минутa" :
                        ((route.departure.duration % 3600) / 60) % 10 > 1 && ((route.departure.duration % 3600) / 60) % 10 < 5 ? "минуты" : "минут"}
                    `}</div>
                </div>
            </div>   
        </div>  
    )
}

export default TrainDetails;