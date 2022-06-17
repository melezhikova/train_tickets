import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setChoosenSeat, setError } from "../actions/actionCreators";

function ChoicePlaces (props) {

    const { coach } = props;
    const { choosenSeats, quantity } = useSelector(state => state.seats);
    const [ seatsInCoach, setSeats ] = useState([]);
    const [ totalPrice, setTotalPice ] = useState(0);

    const first = [0,2,4,6,8,10,12,14];
    const second = [0,4,8,12,16,20,24,28];
    const third = [32,34,36,38,40,42,44,46];
    const fourth1 = [0,2,4,6,8,10,12,14,16,18,20,22,24,26,28,30];
    const fourth2 = [33,35,37,39,41,43,45,47,49,51,53,55,57,59];
    const type = coach.coach.class_type;

    const dispatch = useDispatch();

    useEffect(() => {
        let price = 0;
        let seats = [];
        if (choosenSeats.length > 0) {
            if (choosenSeats.findIndex(item => item.coach === coach.coach._id) !== -1) {
                choosenSeats.find(item => item.coach === coach.coach._id).seats.forEach(item => {
                    seats.push(item.place);
                    price += item.price;
                });
            }
            console.log(seatsInCoach);
            setSeats(seats);
            setTotalPice(price);
        }
    },[choosenSeats])

    const chooseSeat = seat => {
        let price = 0;
        if (coach.seats.find(item => item.index === seat)?.available) {
            if (type === "second" || type === "third") {
                if (seat % 2 === 0) {
                    price = coach.coach.top_price;
                } else {
                    price = coach.coach.bottom_price;
                }
            } else if (type === "first") {
                price = coach.coach.price;
            } else {
                price = coach.coach.bottom_price;
            }
            let totalSeats = 0;
            if (choosenSeats.length > 0) {
                choosenSeats.forEach(item => {
                    totalSeats += item.seats.length;
                    console.log(totalSeats);
                    console.log(quantity.adultQuantity*1 + quantity.childQuantity*1);
                })
                if (totalSeats >= (quantity.adultQuantity*1 + quantity.childQuantity*1)) {
                    if (seatsInCoach.includes(seat)) {
                        dispatch(setChoosenSeat(coach.coach._id, seat, price));
                    } else {
                        dispatch(setError(
                            "Превышение количества выбранных мест.", 
                            "Если Вам необходимо выбрать еще места, необходимо добавить количество билетов (взрослых или детских).",
                            "error"
                        ));
                    }
                } else {
                    dispatch(setChoosenSeat(coach.coach._id, seat, price));
                }
            } else {
                dispatch(setChoosenSeat(coach.coach._id, seat, price));
            }
            
        }
    }

    return (
        <div className="choicePlaces">
            <div className={type !== "fourth" ? "choicePlacesPic choicePlacesPic_123" : "choicePlacesPic choicePlacesPic_4"}></div>
            <div className="choicePlaces_coachNumber">{coach.coach.name.split('-')[1]}</div>
            <div className="choicePlaces_placesContainer">
                {(type === "first") && first.map(o => (
                    <div className="choicePlaces_placesBox" key={o}>
                        <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find(item => item.index === 1 + o)?.available ? "choicePlaces_placeFirst choicePlaces_placeOccupied" : seatsInCoach.includes(1 + o) ? "choicePlaces_placeFirst choicePlaces_placeChoosenFirst" : "choicePlaces_placeFirst"}>{1 + o}</div>
                        <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find(item => item.index === 2 + o)?.available ? "choicePlaces_placeFirst choicePlaces_placeOccupied" : seatsInCoach.includes(2 + o) ? "choicePlaces_placeFirst choicePlaces_placeChoosenFirst" : "choicePlaces_placeFirst"}>{2 + o}</div>
                    </div>
                ))}
                {(type === "second" || type === "third") && second.map(o => (
                    <div className="choicePlaces_placesBox" key={o}>
                        <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find(item => item.index === 1 + o)?.available ? "choicePlaces_place choicePlaces_placeOccupied" : seatsInCoach.includes(1 + o) ? "choicePlaces_place choicePlaces_placeChoosen" : "choicePlaces_place"}>{1 + o}</div>
                        <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find(item => item.index === 2 + o)?.available ? "choicePlaces_place choicePlaces_placeOccupied" : seatsInCoach.includes(2 + o) ? "choicePlaces_place choicePlaces_placeChoosen" : "choicePlaces_place"}>{2 + o}</div>
                        <div onClick={() => chooseSeat(3 + o)} className={!coach.seats.find(item => item.index === 3 + o)?.available ? "choicePlaces_place choicePlaces_placeOccupied" : seatsInCoach.includes(3 + o) ? "choicePlaces_place choicePlaces_placeChoosen" : "choicePlaces_place"}>{3 + o}</div>
                        <div onClick={() => chooseSeat(4 + o)} className={!coach.seats.find(item => item.index === 4 + o)?.available ? "choicePlaces_place choicePlaces_placeOccupied" : seatsInCoach.includes(4 + o) ? "choicePlaces_place choicePlaces_placeChoosen" : "choicePlaces_place"}>{4 + o}</div>
                    </div>
                ))}
                {(type === "fourth") && fourth1.map(o => (
                    <div className="choicePlaces_placesBoxFourth" key={o}>
                        <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find(item => item.index === 1 + o)?.available ? "choicePlaces_placeFourth choicePlaces_placeOccupied" : seatsInCoach.includes(1 + o) ? "choicePlaces_placeFourth choicePlaces_placeChoosenFourth" : "choicePlaces_placeFourth"}>{1 + o}</div>
                        <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find(item => item.index === 2 + o)?.available ? "choicePlaces_placeFourth choicePlaces_placeOccupied" : seatsInCoach.includes(2 + o) ? "choicePlaces_placeFourth choicePlaces_placeChoosenFourth" : "choicePlaces_placeFourth"}>{2 + o}</div>
                    </div>
                ))}
            </div>
            <div className="choicePlaces_placesContainerThird">
                {type === "third" && third.map(o => (
                    <div className="choicePlaces_placesBoxThird" key={o}>
                        <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find(item => item.index === 1 + o)?.available ? "choicePlaces_placeThird choicePlaces_placeOccupied" : seatsInCoach.includes(1 + o) ? "choicePlaces_placeThird choicePlaces_placeChoosen" : "choicePlaces_placeThird"}>{1 + o}</div>
                        <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find(item => item.index === 2 + o)?.available ? "choicePlaces_placeThird choicePlaces_placeOccupied" : seatsInCoach.includes(2 + o) ? "choicePlaces_placeThird choicePlaces_placeChoosen" : "choicePlaces_placeThird"}>{2 + o}</div>
                    </div>
                ))}
            </div>
            <div className="choicePlaces_placesSecondContainerForFourth">
                {(type === "fourth") && <div className="choicePlaces_placesBoxFourth">
                    <div onClick={() => chooseSeat(33)} className={!coach.seats.find(item => item.index === 33)?.available ? "choicePlaces_placeFourth choicePlaces_placeOccupied" : seatsInCoach.includes(33) ? "choicePlaces_placeFourth choicePlaces_placeChoosenFourth" : "choicePlaces_placeFourth"}>33</div>
                </div>}
                {(type === "fourth") && fourth2.map(o => (
                    <div className="choicePlaces_placesBoxFourth" key={o}>
                        <div onClick={() => chooseSeat(1 + o)} className={!coach.seats.find(item => item.index === 1 + o)?.available ? "choicePlaces_placeFourth choicePlaces_placeOccupied" : seatsInCoach.includes(1 + o) ? "choicePlaces_placeFourth choicePlaces_placeChoosenFourth" : "choicePlaces_placeFourth"}>{1 + o}</div>
                        <div onClick={() => chooseSeat(2 + o)} className={!coach.seats.find(item => item.index === 2 + o)?.available ? "choicePlaces_placeFourth choicePlaces_placeOccupied" : seatsInCoach.includes(2 + o) ? "choicePlaces_placeFourth choicePlaces_placeChoosenFourth" : "choicePlaces_placeFourth"}>{2 + o}</div>
                    </div>
                ))}
                {(type === "fourth") && <div className="choicePlaces_placesBoxFourth"> 
                    <div onClick={() => chooseSeat(62)} className={!coach.seats.find(item => item.index === 62)?.available ? "choicePlaces_placeFourth choicePlaces_placeOccupied" : seatsInCoach.includes(62) ? "choicePlaces_placeFourth choicePlaces_placeChoosenFourth" : "choicePlaces_placeFourth"}>62</div>
                </div>}
            </div>
            {totalPrice > 0 && <div className="choicePlaces_totalPrice">
                <div className="choicePlaces_totalPriceFigure">{totalPrice.toLocaleString()}</div>
                <div className="seatsPriceСurrency"></div>
            </div>}
        </div>
    )
}

export default ChoicePlaces;