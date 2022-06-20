import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearOrder, clearPassengers, clearSeats } from "../actions/actionCreators";
import Footer from "./Footer";
import Menu from "./Menu";

function SuccessOrder () {
    const { totalPrice } = useSelector(state => state.order);
    const { first_name, patronymic } = useSelector(state => state.user);

    const [ estimation, setEstimation ] = useState(0);
    const allStars = [1,2,3,4,5];

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const estimate = figure => {
        setEstimation(figure);
    }

    const backHome = () => {
        navigate('/');
        dispatch(clearOrder());
        dispatch(clearPassengers());
        dispatch(clearSeats());
    }

    return (
        <div>
            <header className="finishPage_header">
                <a href="/#logo" id="logo" className="logo">Лого</a>
                <Menu />
                <div className="finishPage_headerContainer">
                    <div className="thanksInHeader">Благодарим Вас за заказ!</div>
                </div>
            </header>
            <div className="finishPage">
                <div className="finishPage_container">
                    <div className="finishPage_orderDetails">
                        <div className="finishPage_orderDetailsText">№Заказа 285АА</div>
                        <div className="finishPage_orderDetailsSumm">сумма
                            <div className="finishPage_orderDetailsFigure">{totalPrice.toLocaleString()}</div>
                            <div className="seatsPriceСurrency finishPage_priceСurrency"></div>
                        </div>
                    </div>
                    <div className="finishPage_services">
                        <div className="finishPage_servicesItem">
                            <div className="finishPage_servicesItemPic finishPage_servicesItemPic_first"></div>
                            <div className="finishPage_servicesItemText">билеты будут отправлены на ваш e-mail</div>
                        </div>
                        <div className="finishPage_servicesItem">
                            <div className="finishPage_servicesItemPic finishPage_servicesItemPic_second"></div>
                            <div className="finishPage_servicesItemText">распечатайте и сохраняйте билеты до даты поездки</div>
                        </div>
                        <div className="finishPage_servicesItem">
                            <div className="finishPage_servicesItemPic finishPage_servicesItemPic_third"></div>
                            <div className="finishPage_servicesItemText">предьявите распечатанные билеты при посадке</div>
                        </div>
                    </div>
                    <div className="finishPage_notification">
                        <div className="finishPage_userName">{`${first_name} ${patronymic}!`}</div>
                        <div>
                            <p className="finishPage_text">Ваш заказ успешно оформлен.</p>
                            <p className="finishPage_text">В ближайшее время с вами свяжется наш оператор для подтверждения.</p>
                        </div>
                        <div className="finishPage_thanksText">Благодарим Вас за оказанное доверие и желаем приятного путешествия!</div>
                    </div>
                    <div className="finishPage_bottom">
                        <div className="finishPage_estimation">Оценить сервис
                            <div className="finishPage_estimationStars">
                                {allStars.map(star => (
                                    <div key={star} onClick={()=>estimate(star)} className={estimation >= star ? "finishPage_estimationStarPicFull"  : "finishPage_estimationStarPic"}></div>
                                ))}
                            </div>
                        </div>
                        <button className="yellowBtn finishPageBtn" onClick={backHome}>ВЕРНУТЬСЯ НА ГЛАВНУЮ</button>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SuccessOrder;