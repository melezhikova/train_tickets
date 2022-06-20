import Footer from "./Footer";
import LastRoutes from "./LastRoutes";
import Routes from "./Routes";
import RoutesPages from "./RoutesPages";
import SecondaryHeader from "./SecondaryHeader";
import SortingPanel from "./SortingPanel";
import Stage from "./Stage";
import TripTools from "./TripTools";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Loading from "./Loading";
import Info from "./Info";
import { fetchRoutes } from "../actions/actionCreators";


function Tickets () {

    const { loadingStatus } = useSelector(state => state.routeSettings);
    const { routeSet } = useSelector(state => state.routeSettings);
    const dispatch = useDispatch();
  
    useEffect (() => {
        dispatch(fetchRoutes(routeSet));
    },[routeSet, dispatch])

    return (
        <div>
            <SecondaryHeader />
            {loadingStatus === 'pending' && <Loading />}
            {loadingStatus === 'error' && 
                <main className="error_mainContainer">
                    <Info />
                </main>
            }
            {(loadingStatus === 'idle' || loadingStatus === 'success') &&  
                <div>
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
                </div>
            }
            <Footer />
        </div>
    )
}

export default Tickets;