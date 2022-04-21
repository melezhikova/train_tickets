import Footer from "./Footer";
import LastRoutes from "./LastRoutes";
import Routes from "./Routes";
import RoutesPages from "./RoutesPages";
import SecondaryHeader from "./SecondaryHeader";
import SortingPanel from "./SortingPanel";
import Stage from "./Stage";
import TripTools from "./TripTools";


function Tickets () {
   
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
                    <SortingPanel />
                    <Routes />
                    <RoutesPages />
                </aside>
            </main>
            <Footer />
        </div>
    )
}

export default Tickets;