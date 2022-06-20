import Footer from "./Footer";
import SecondaryHeader from "./SecondaryHeader";
import Stage from "./Stage";
import TripDetails from "./TripDetails";
import AvailableSeats from "./AvailableSeats";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { fetchOrder } from "../actions/actionCreators";
import { setTotalPrice } from "../actions/actionCreators";
import Info from "./Info";

function Verify () {

    const { route, quantity, choosenSeats } = useSelector(state => state.seats);
    const { passengers } = useSelector(state => state.passengers);
    const { loadingStatus } = useSelector(state => state.order);
    const { first_name, last_name, patronymic, phone, email, payment_method } = useSelector(state => state.user);
    const [ totalPrice, setTotalPice ] = useState(0);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        let totalPriceNew = 0;
        if (choosenSeats.length > 0) {
            choosenSeats.forEach(item => {
                if (item.seats.length > 0) {
                    item.seats.forEach(place => totalPriceNew += place.price);
                }
            })
        }
        setTotalPice(totalPriceNew);
        dispatch(setTotalPrice(totalPriceNew));
        console.log('1');
    },[choosenSeats])


    const changeTrain = () => {
        navigate('/tickets');
    }

    const changeTickets = () => {
        navigate('/seats');
    }

    const changePaymentMethod = () => {
        navigate('/paying');
    }

    const toVerify = () => {
        let places = [];
        let adultPassengers = [];
        let childPassengers = [];
        let placesWithPass = [];
        choosenSeats.forEach(item => {
            if (item.seats.length > 0) {
                item.seats.forEach(place => places.push({
                    coach_id: item.coach,
                    seat_number: place.place
                }));
            }
        })
        passengers.forEach(pass => {
            if(pass.is_adult) {
                adultPassengers.push({
                    passenger: pass,
                    include_children_seat: false,
                });
            } else {
                childPassengers.push(pass);
            }
        })
        if (quantity.childWithoutSeatQuantity > 0) {
            for (let i = 0; i < quantity.childWithoutSeatQuantity * 1; i +=1 ) {
                adultPassengers[i].include_children_seat = true;
            }
        } 
        
        for (let i=0; i < adultPassengers.length; i+=1) {
            placesWithPass.push({
                coach_id: places[i].coach_id,
                person_info: {
                    is_adult: true,
                    first_name: adultPassengers[i].passenger.first_name,
                    last_name: adultPassengers[i].passenger.last_name,
                    patronymic: adultPassengers[i].passenger.patronymic,
                    gender: adultPassengers[i].passenger.gender,
                    birthday: adultPassengers[i].passenger.birthday,
                    document_type: adultPassengers[i].passenger.document_type,
                    document_data: adultPassengers[i].passenger.documentSeries + adultPassengers[i].passenger.documentNumber,
                },
                seat_number: places[i].seat_number,
                is_child: false,
                include_children_seat: adultPassengers[i].include_children_seat,
            })
        }
        if (places.length > adultPassengers.length) {
            for (let j = adultPassengers.length; j < places.length; j += 1) {
                for (let k = 0; k < quantity.childQuantity; k += 1) {
                    placesWithPass.push({
                        coach_id: places[j].coach_id,
                        person_info: {
                            is_adult: false,
                            first_name: childPassengers[k].first_name,
                            last_name: childPassengers[k].last_name,
                            patronymic: childPassengers[k].patronymic,
                            gender: childPassengers[k].gender,
                            birthday: childPassengers[k].birthday,
                            document_type: childPassengers[k].document_type,
                            document_data: childPassengers[k].documentSeries + adultPassengers[k].documentNumber,
                        },
                        seat_number: places[j].seat_number,
                        is_child: true,
                        include_children_seat: false,
                    })
                }              
            }
        } 

        const data = {
            user: {
                first_name, 
                last_name, 
                patronymic, 
                phone, email, 
                payment_method
            },
            departure: {
                route_direction_id: route.departure._id,
                seats: placesWithPass,
            }
        }
        const callback = () => {
            navigate('/successOrder');
        }

        dispatch(fetchOrder(data, callback));
    }

    return (
        <div>
            <SecondaryHeader />
            {loadingStatus === 'error' && 
                <main className="error_mainContainer">
                    <Info />
                </main>
            }
            {loadingStatus !== 'error' && 
                <div> 
                    <Stage stage="4" />
                    <main className="mainContainer">
                        <aside className="leftPanel">
                            <TripDetails />
                        </aside>
                        <aside className="rightPanel">
                            <section className="verifySection">
                                <div className="verify_header">Поезд</div>
                                <div className="verify_container">
                                    <div className="routes_routeContainerLeftSide">
                                        <div className="routes_routeTrainPicBorder">
                                            <div className="routes_routeTrainPic routes_routeTrainPic_trainStart"></div>
                                        </div>
                                        <div className="routes_routeName">{route.departure.train.name}</div>
                                        <div className="routes_routeItinerary">
                                            <div className="routes_routeItineraryFromBox">
                                                <div>{route.departure.from.city.name}</div>
                                                <div className="routes_routeItineraryAroow"></div>
                                            </div>
                                            <div>{route.departure.to.city.name}</div>
                                        </div>
                                    </div>
                                    <div className="routes_routeDetails">
                                        <div className="routes_timing">
                                            <div className="routes_timingRow">
                                                <div className="routes_timingItinerary">
                                                    <div className="routes_timingTime">{format(new Date(route.departure.from.datetime * 1000),'hh:mm')}</div>
                                                    <div className="routes_timingCity">{route.departure.from.city.name}</div>
                                                    <div className="routes_timingStation">{route.departure.from.railway_station_name}</div>
                                                </div>
                                                <div className="routes_duration">
                                                    <div className="routes_durationTime">
                                                        <div className="routes_durationTime">{`${Math.trunc(route.departure.duration / 3600)}:${((route.departure.duration % 3600) / 60) < 10 ? `0${(route.departure.duration % 3600) / 60}` : (route.departure.duration % 3600) / 60}`}</div>
                                                    </div>
                                                    <div className="routes_yellowArrowPic routes_yellowArrowPic_trainStart"></div>
                                                </div>
                                                <div className="routes_timingItinerary">
                                                    <div className="routes_timingTime">{format(new Date(route.departure.to.datetime * 1000), 'hh:mm')}</div>
                                                    <div className="routes_timingCity">{route.departure.to.city.name}</div>
                                                    <div className="routes_timingStation">{route.departure.to.railway_station_name}</div>
                                                </div>
                                            </div>
                                            <div className="routes_timingRow">
                                                <div className="routes_timingItinerary">
                                                    <div className="routes_timingTime">{format(new Date(route.departure.from.datetime * 1000),'hh:mm')}</div>
                                                    <div className="routes_timingCity">{route.departure.from.city.name}</div>
                                                    <div className="routes_timingStation">{route.departure.from.railway_station_name}</div>
                                                </div>
                                                <div className="routes_duration">
                                                    <div className="routes_durationTime">
                                                        <div className="routes_durationTime">{`${Math.trunc(route.departure.duration / 3600)}:${((route.departure.duration % 3600) / 60) < 10 ? `0${(route.departure.duration % 3600) / 60}` : (route.departure.duration % 3600) / 60}`}</div>
                                                    </div>
                                                    <div className="routes_yellowArrowPic routes_yellowArrowPic_trainEnd"></div>
                                                </div>
                                                <div className="routes_timingItinerary">
                                                    <div className="routes_timingTime">{format(new Date(route.departure.to.datetime * 1000), 'hh:mm')}</div>
                                                    <div className="routes_timingCity">{route.departure.to.city.name}</div>
                                                    <div className="routes_timingStation">{route.departure.to.railway_station_name}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="routes_seats verify_seats">
                                            {route.departure.available_seats_info.fourth && 
                                                <AvailableSeats type="Сидячий" quantity={route.departure.available_seats_info.fourth} price={route.departure.price_info.fourth.bottom_price} />
                                            }
                                            {route.departure.available_seats_info.third && 
                                                <AvailableSeats type="Плацкарт" quantity={route.departure.available_seats_info.third} price={route.departure.price_info.third.bottom_price}
                                                top={route.departure.price_info.third.top_price} bottom={route.departure.price_info.third.bottom_price} side={route.departure.price_info.third.side_price} />
                                            }
                                            {route.departure.available_seats_info.second && 
                                                <AvailableSeats type="Купе" quantity={route.departure.available_seats_info.second} price={route.departure.price_info.second.bottom_price} 
                                                top={route.departure.price_info.second.top_price} bottom={route.departure.price_info.second.bottom_price}/>
                                            }
                                            {route.departure.available_seats_info.first && 
                                                <AvailableSeats type="Люкс" quantity={route.departure.available_seats_info.first} price={route.departure.price_info.first.bottom_price} />
                                            }
                                            <div className="routesServicesPics"></div>
                                            <button onClick={changeTrain} className="whiteBtn verifyBtn">Изменить</button>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="verifySection">
                                <div className="verify_header">Пассажиры</div>
                                <div className="verify_container">
                                    <div className="verify_leftPart">
                                        {passengers.map(o => (
                                            <div className="verify_passenger" key={o.number}>
                                                <div className="verify_passengerLeft">
                                                    <div className="verify_passengerPic"></div>
                                                    <div>{o.adult ? "Взрослый" : "Детский"}</div>
                                                </div>
                                                <div>
                                                    <div className="verify_name">{`${o.last_name} ${o.first_name} ${o.patronymic}`}</div>
                                                    <div className="verify_passengerDetails">{`Пол ${o.gender ? "мужской" : "женский"}`}</div>
                                                    <div className="verify_passengerDetails">{`Дата рождения ${format(new Date(o.birthday), 'dd.MM.yyyy')}`}</div>
                                                    <div className="verify_passengerDetails">{`${o.document_type} ${o.document_type === "Паспорт" ? `${o.documentSeries} ${o.documentNumber}` : `${o.documentSeries}`}`}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="verify_rightPart">
                                        <div className="verify_totalPrice">
                                            <div>Всего</div>
                                            <div className="verify_totalPriceBox">
                                                <div className="verify_totalPriceFigure">{totalPrice.toLocaleString()}</div>
                                                <div className="seatsPriceСurrency verify_priceСurrency"></div>
                                            </div>
                                        </div>
                                        <button onClick={changeTickets} className="whiteBtn verifyBtn">Изменить</button>
                                    </div>
                                </div>
                            </section>              
                            <section className="verifySection">
                                <div className="verify_header">Способ оплаты</div>
                                <div className="verify_container">
                                    <div className="verify_leftPart">
                                        <div className="verify_paymentMethod">{payment_method === "online" ? "Онлайн" : "Наличными"}</div>
                                    </div>
                                    <div className="verify_rightPart">
                                        <button onClick={changePaymentMethod} className="whiteBtn verifyBtn">Изменить</button>
                                    </div>
                                </div>
                            </section>
                                <div className="btnBox">
                                    <button disabled={loadingStatus === 'pending' ? true : false} onClick={toVerify} className="yellowBtn seatsBtn">ПОДТВЕРДИТЬ</button>
                                </div>
                        </aside>
                    </main>
                </div>
            }
            <Footer />
        </div>
    )
}

export default Verify;