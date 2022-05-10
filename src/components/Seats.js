import Footer from "./Footer";
import LastRoutes from "./LastRoutes";
import SecondaryHeader from "./SecondaryHeader";
import Stage from "./Stage";
import Train from "./Train";
import TripTools from "./TripTools";
import { useNavigate } from "react-router-dom";

function Seats () {

    const navigate = useNavigate();
    const goNext = () => {

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
                    <section>
                        <div className="sectionHeader sectionSeats">выбор мест</div>
                        <Train direction="trainStart" />
                        <Train direction="trainEnd" />
                        <button onClick={goNext} className="routesBtn seatsBtn btn">далее</button>
                    </section>
                </aside>
            </main>
            <Footer />
        </div>
    )
}

export default Seats;