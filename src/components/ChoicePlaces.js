import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChoosenSeat } from "../actions/actionCreators";

function ChoicePlaces (props) {

    const { coach } = props;
    const { choosenSeats } = useSelector(state => state.seats);
    const [ seatsInCoach, setSeats ] = useState([]);

    const second = [0,4,8,12,16,20,24,28];
    const type = coach.coach.class_type;

    const dispatch = useDispatch();

    useEffect(() => {
        console.log(choosenSeats);
        if (choosenSeats.length > 0) {
            if (choosenSeats.findIndex(item => item.coach === coach.coach._id) !== -1) {
                setSeats(choosenSeats.find(item => item.coach === coach.coach._id).seats);
            }
            console.log(seatsInCoach);
        }
    },[choosenSeats])

    const chooseSeat = seat => {
        if (coach.seats.find(item => item.index === seat)?.available) {
            dispatch(setChoosenSeat(seat, coach.coach._id));
        }
    }

    return (
        <div className="choicePlaces">
            <div className="choicePlacesClients"></div>
            <div className={type !== 'fourth' ? "choicePlacesPic choicePlacesPic_123" : "choicePlacesPic choicePlacesPic_4"}></div>
            <div className="choicePlaces_placesContainer">
                {type === "second" || type === "third" && second.map(o => (
                    <div className="choicePlaces_placesBox" key={o}>
                        <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find(item => item.index === 1 + o)?.available ? "choicePlaces_placeOccupied" : seatsInCoach.includes(1 + o) ? "choicePlaces_placeChoosen" : "choicePlaces_place"}>{1 + o}</div>
                        <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find(item => item.index === 2 + o)?.available ? "choicePlaces_placeOccupied" : seatsInCoach.includes(2 + o) ? "choicePlaces_placeChoosen" : "choicePlaces_place"}>{2 + o}</div>
                        <div onClick={() => chooseSeat(3 + o)} className={!coach.seats.find(item => item.index === 3 + o)?.available ? "choicePlaces_placeOccupied" : seatsInCoach.includes(3 + o) ? "choicePlaces_placeChoosen" : "choicePlaces_place"}>{3 + o}</div>
                        <div onClick={() => chooseSeat(4 + o)} className={!coach.seats.find(item => item.index === 4 + o)?.available ? "choicePlaces_placeOccupied" : seatsInCoach.includes(4 + o) ? "choicePlaces_placeChoosen" : "choicePlaces_place"}>{4 + o}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChoicePlaces;