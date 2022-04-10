import Footer from "./Footer";
import LastRoutes from "./LastRoutes";
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

                </aside>
            </main>
            <Footer />
        </div>
    )
}

export default Tickets;