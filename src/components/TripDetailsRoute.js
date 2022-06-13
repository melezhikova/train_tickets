import { format } from "date-fns";

function TripDetailsRoute (props) {
    const { train } = props;

    return (
        <div>
            <div className="tripDetails_sectionRow">
                <div>№ поезда</div>
                <div className="tripDetails_trainNumber">{train.train.name}</div>
            </div>
            <div className="tripDetails_sectionRow">
                <div>Название</div>
                <div className="tripDetails_trainName">
                    <div>{train.from.city.name}</div>
                    <div>{train.to.city.name}</div>
                </div>
            </div>
            <div className="tripDetails_sectionRow tripDetails_duration">
                {`${Math.trunc(train.duration / 3600)}:${((train.duration % 3600) / 60) < 10 ? `0${(train.duration % 3600) / 60}` : (train.duration % 3600) / 60}`}
            </div>
            <div className="tripDetails_sectionRow">
                <div>
                    <div className="tripDetails_trainTime">{format(new Date(train.from.datetime * 1000),'hh:mm')}</div>
                    <div className="tripDetails_date">{format(new Date(train.from.datetime * 1000),'dd.MM.yyyy')}</div>
                </div>
                    <div className="routes_yellowArrowPic routes_yellowArrowPic_trainStart"></div>
                <div className="tripDetails_sectionRowBoxRight">
                    <div className="tripDetails_trainTime">{format(new Date(train.to.datetime * 1000), 'hh:mm')}</div>
                    <div className="tripDetails_date">{format(new Date(train.to.datetime * 1000), 'dd.MM.yyyy')}</div>
                </div>
            </div> 
            <div className="tripDetails_sectionRow">
                <div>
                    <div className="tripDetails_destination">{train.from.city.name}</div>
                    <div className="tripDetails_destinationStation">{train.from.railway_station_name}</div>
                </div>
                <div className="tripDetails_sectionRowBoxRight">
                    <div className="tripDetails_destination">{train.to.city.name}</div>
                    <div className="tripDetails_destinationStation">{train.to.railway_station_name}</div>
                </div>
            </div>
            <div className="tripDetails_sectionRow"></div>
        </div>  
    )
}

export default TripDetailsRoute;