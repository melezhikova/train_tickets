import Footer from "./Footer";
import SecondaryHeader from "./SecondaryHeader";
import Stage from "./Stage";
import { useSelector, useDispatch } from "react-redux";
import TripDetails from "./TripDetails";
import { useEffect, useState } from "react";
import PersonInfo from "./PersonInfo";
import { changeQuantityField } from "../actions/actionCreators";
import { useNavigate } from "react-router-dom";

function Passengers () {

    const { quantity } = useSelector(state => state.seats);
    const { passengers } = useSelector(state => state.passengers);
    const [ passList, setPassList ] = useState([]);
    const [ complete, setComplete ] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect (() => {
        let array = [];
        for (let i=1; i <= (quantity.adultQuantity * 1 + quantity.childQuantity * 1 + quantity.childWithoutSeatQuantity * 1); i+=1) {
            array.push(i);
        }
        setPassList(array);
    },[quantity]);

    useEffect (() => {
        console.log(passengers, complete);
        let check = true;
        for (let i=0; i < passengers.length; i+=1) {
            if (passengers[i].complete === false) {
                check = false;
            }
        }
        setComplete (check);
    },[passengers]);

    const addPassenger = () => {
        dispatch(changeQuantityField('childWithoutSeatQuantity', quantity.childWithoutSeatQuantity * 1 + 1));
    }

    const goNext = () => {
        navigate('/paying');
    }
    
    return (
        <div>
            <SecondaryHeader />
            <Stage stage="2" />
            <main className="mainContainer">
                <aside className="leftPanel">
                    <TripDetails />
                </aside>
                <aside className="rightPanel">
                    {passList.map(o => (
                        <PersonInfo number={o} key={o} />
                    ))}
                    <section className="personInfo">
                        <div className="personInfo_header">
                            <div>Добавить пассажира</div>
                            <div onClick={addPassenger} className="addPassenger"></div>
                        </div>
                    </section>
                    <div className="btnBox">
                        <button onClick={goNext} disabled={!complete} className="yellowBtn seatsBtn">ДАЛЕЕ</button>
                    </div>
                </aside>
            </main>
            <Footer />
        </div>
    )
}

export default Passengers;