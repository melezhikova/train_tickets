import Footer from "./Footer";
import SecondaryHeader from "./SecondaryHeader";
import Stage from "./Stage";
import TripDetails from "./TripDetails";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Verify () {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goNext = () => {
        
    }

    return (
        <div>
            <SecondaryHeader />
            <Stage stage="4" />
            <main className="mainContainer">
                <aside className="leftPanel">
                    <TripDetails />
                </aside>
                <aside className="rightPanel">
                    <section className="verifySection">
                        <div className="verify_header">Поезд</div>
                        <div>
                                
                        </div>
                    </section>
                    <section className="verifySection">
                        <div className="verify_header">Пассажиры</div>
                        <div>
                                
                        </div>
                    </section>              
                    <section className="verifySection">
                        <div className="verify_header">Способ оплаты</div>
                        
                    </section>
                        <div className="btnBox">
                            <button onClick={goNext} className="yellowBtn seatsBtn">ПОДТВЕРДИТЬ</button>
                        </div>
                </aside>
            </main>
            <Footer />
        </div>
    )
}

export default Verify;