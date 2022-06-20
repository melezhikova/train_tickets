import Footer from "./Footer";
import SecondaryHeader from "./SecondaryHeader";
import Stage from "./Stage";
import { useSelector, useDispatch } from "react-redux";
import TripDetails from "./TripDetails";
import { useState } from "react";
import { changeUserField, setInfo } from "../actions/actionCreators";
import { useNavigate } from "react-router-dom";
import Info from "./Info";


function Paying () {

    const { first_name, last_name, patronymic, phone, email, payment_method } = useSelector(state => state.user);
    const { info } = useSelector(state => state.showMessages);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ errorField, setErrorField ] = useState(null);

    const checkingForm = () => {
        let invalid = null;
        if (last_name === "") {
            invalid = "last_name";
        } else if (first_name === "") {
            invalid = "first_name";
        } else if (patronymic === "") {
            invalid = "patronymic";
        } else if (phone === "") {
            invalid = "phone";
        } else if (email === "") {
            invalid = "email";
        } else if (payment_method === "") {
            invalid = "payment_method";
        }

        setErrorField(invalid);
        if (invalid !== null) {
            if (invalid === "payment_method") {
                dispatch(setInfo(
                    "Необходимо указать способ оплаты.", 
                    "",
                    "info",
                ))
            }
            return false;
        } else {
            return true;
        }
    
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        dispatch(changeUserField(name, value));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        goNext();
    }

    const choosePayMethod = method => {
        dispatch(changeUserField("payment_method", method));
    }

    const goNext = () => {
        const check = checkingForm ();
        if (check) {
            navigate('/verify');
        }
    }

    return (
        <div>
            {info && <Info />}
            <SecondaryHeader />
            <Stage stage="3" />
            <main className="mainContainer">
                <aside className="leftPanel">
                    <TripDetails />
                </aside>
                <aside className="rightPanel">
                    <form onSubmit={handleSubmit}>
                        <section className="personInfo payingSection">
                            <div className="paying_header">Персональные данные</div>
                            <div>
                                <div className="personInfo_formRow personInfo_formRowName">
                                    <div className="personInfo_nameBox">
                                        <label className="personInfo_label paying_label" htmlFor="last_name">Фамилия</label>
                                        <input className={errorField === "last_name" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"} 
                                        onChange={handleChange} id="last_name" value={last_name} name="last_name" required />
                                    </div>
                                    <div className="personInfo_nameBox">
                                        <label className="personInfo_label paying_label" htmlFor="first_name">Имя</label>
                                        <input className={errorField === "first_name" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"}
                                        onChange={handleChange} id="first_name" value={first_name} name="first_name" required />
                                    </div>
                                    <div className="personInfo_nameBox">
                                        <label className="personInfo_label paying_label" htmlFor="patronymic">Отчество</label>
                                        <input className={errorField === "patronymic" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"} 
                                        onChange={handleChange} id="patronymic" value={patronymic} name="patronymic" required />
                                    </div>
                                </div>
                                <div className="paying_formRow">
                                    <label className="personInfo_label paying_label" htmlFor="phone">Контактный телефон</label>
                                    <input className={errorField === "phone" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"} 
                                    type="tel" onChange={handleChange} id="phone" value={phone} name="phone" placeholder="+7 ___ ___ __ __" required />
                                </div>
                                <div className="paying_formRow">
                                    <label className="personInfo_label paying_label" htmlFor="email">E-mail</label>
                                    <input className={errorField === "email" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"} 
                                    type="email" onChange={handleChange} id="email" value={email} name="email" placeholder="inbox@gmail.ru" required />
                                </div>
                            </div>
                            <div className="paying_header">Способ оплаты</div>
                            <div className="paying_radioRow">
                                <div className={payment_method === "null" ? "customRadioRed" : payment_method === "online" ? "customRadioChecked" : "customRadio"} onClick={() => choosePayMethod("online")}></div>
                                <div className={payment_method === "online" ? "paying_textChecked" : "paying_text"}>Онлайн</div>
                            </div>
                            <div className="paying_onlineTypes">
                                <div className="paying_onlineTypes_type">Банковской картой</div>
                                <div className="paying_onlineTypes_type">PayPal</div>
                                <div className="paying_onlineTypes_type">Visa QIWI Wallet</div>
                            </div>
                            <div className="paying_radioRow">
                                <div className={payment_method === "null" ? "customRadioRed" : payment_method === "cash" ? "customRadioChecked" : "customRadio"} onClick={() => choosePayMethod("cash")}></div>
                                <div className={payment_method === "cash" ? "paying_textChecked" : "paying_text"}>Наличными</div>
                            </div>
                        </section>
                        <div className="btnBox">
                            <button onClick={goNext} className="yellowBtn seatsBtn">КУПИТЬ БИЛЕТЫ</button>
                        </div>
                    </form>
                </aside>
            </main>
            <Footer />
        </div>
    )
}

export default Paying;