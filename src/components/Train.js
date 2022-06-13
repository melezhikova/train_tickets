import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TrainDetails from "./TrainDetails";
import TrainTicketsQuantity from "./TrainTicketsQuantity";
import TrainCoach from "./TrainCoach";

function Train (props) {

    const { direction } = props;
    const { seats } = useSelector(state => state.seats);

    const [type, setType] = useState(null);
    const [coaches, setCoaches] = useState([]);
    const [choosenCoaches, setChoosenCoaches] = useState([]);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let newCoaches = [];
        if (seats && type) {
            seats.forEach(item => {
                if (item.coach.class_type === type) {
                    newCoaches.push(item.coach.name);
                }
            })
        }
        setCoaches(newCoaches);
        if (newCoaches.length > 0) {
            setChoosenCoaches(prevState => {
                prevState.push(seats.find(item => item.coach.name === newCoaches[0]));
                return [...prevState];
            });
        }
    },[seats, type])

    const changeTrain = () => {
        navigate('/tickets');
    }

    const changeType = smth => {
        setType(prevState => prevState === smth ? null : smth);
        setChoosenCoaches([]);
    }

    const chooseCoach = nmb => {
        setChoosenCoaches(prevState => {
            console.log(prevState);
            const index = prevState.findIndex(item => item.coach.name === nmb);
            if (index === -1) { 
                prevState.push(seats.find(item => item.coach.name === nmb));
            }
            return [...prevState];
        });
    }
     
    return (
        <div className="train">
            <div className={`header_${direction}`}>
                <div className={`headerPic_${direction}`}></div>
                <button onClick={changeTrain} className="whiteBtn">Выбрать другой поезд</button>
            </div>
            <TrainDetails direction={direction} />
            <div className="train_header">Количество билетов</div>  
            <TrainTicketsQuantity />
            <div className="train_header">Тип вагона</div>   
            <div className="train_typesContainer">
                <div onClick={() => changeType('fourth')} className="train_typesItem">
                    <div className={type === "fourth" ? "train_typesPic train_typesPic_fourthActive" : "train_typesPic train_typesPic_fourth"}></div>
                    <div className="train_typesName">Сидячий</div>
                </div>
                <div onClick={() => changeType('third')} className="train_typesItem">
                    <div className={type === "third" ? "train_typesPic train_typesPic_thirdActive" : "train_typesPic train_typesPic_third"}></div>
                    <div className="train_typesName">Плацкарт</div>
                </div>
                <div onClick={() => changeType('second')} className="train_typesItem">
                    <div className={type === "second" ? "train_typesPic train_typesPic_secondActive" : "train_typesPic train_typesPic_second"}></div>
                    <div className="train_typesName">Купе</div>
                </div>
                <div onClick={() => changeType('first')} className="train_typesItem">
                    <div className={type === "first" ? "train_typesPic train_typesPic_firstActive" : "train_typesPic train_typesPic_first"}></div>
                    <div className="train_typesName">Люкс</div>
                </div>
            </div>
            {type && coaches.length > 0 &&
                <div className="seats">
                    <div className="seats_coaches">
                        <div className="seats_coachesNumbers">
                            <div>Вагоны</div>
                            {coaches.map(o => (
                                <div onClick={() => chooseCoach(o)} key={o} className={choosenCoaches.length > 0 && choosenCoaches.some(item => item.coach.name === o) ? "seats_coachNumber seats_coachNumberActive" : "seats_coachNumber"}>{o}</div>
                            ))}
                        </div>
                        <div className="seats_coachesText">Нумерация вагонов начинается с головы поезда</div>
                    </div>
                    {choosenCoaches.length > 0 && 
                        choosenCoaches.map(o => <TrainCoach key={o.coach._id} coach={o} type={type} />)
                    }
                </div>
            }
        </div>
    )
}

export default Train;