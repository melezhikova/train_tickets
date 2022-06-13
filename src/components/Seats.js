import Footer from "./Footer";
import LastRoutes from "./LastRoutes";
import SecondaryHeader from "./SecondaryHeader";
import Stage from "./Stage";
import Train from "./Train";
import TripTools from "./TripTools";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchSeats } from "../actions/actionCreators";

function Seats () {

    const { route } = useSelector(state => state.seats);
    const { routeSet } = useSelector(state => state.routeSettings);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(fetchSeats(route.departure._id, {
            have_first_class: routeSet.have_first_class,
            have_second_class: routeSet.have_second_class,
            have_third_class: routeSet.have_third_class,
            have_fourth_class: routeSet.have_fourth_class,
            have_wifi: routeSet.have_wifi,
            have_air_conditioning: routeSet.have_air_conditioning,
            have_express: routeSet.have_express,
        }));
    },[route, routeSet, dispatch])

    const goNext = () => {
        navigate("/passengers");
    }

    return (
        <div>
            <SecondaryHeader />
            <Stage stage="1" />
            <main className="mainContainer">
                <aside className="leftPanel">
                    <TripTools />
                    <LastRoutes />
                </aside>
                <aside className="rightPanel">
                    <section className="seats">
                        <div className="sectionHeader sectionSeats">выбор мест</div>
                        <Train direction="trainStart" />
                        <Train direction="trainEnd" />
                        <div className="btnBox">
                            <button onClick={goNext} className="yellowBtn seatsBtn">ДАЛЕЕ</button>
                        </div>
                    </section>
                </aside>
            </main>
            <Footer />
        </div>
    )
}

export default Seats;