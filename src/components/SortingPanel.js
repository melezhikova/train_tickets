import { useSelector, useDispatch } from "react-redux";
import { setRouteSetting } from "../actions/actionCreators";
import { useState } from "react";

function SortingPanel () {

    const { routeSet, routes } = useSelector(state => state.routeSettings);
    const [ sortTools, setSortTools ] = useState(false);
    const dispatch = useDispatch();

    const changeLimit = number => {
        dispatch(setRouteSetting('limit', number));
    }

    const showSort = () => {
        setSortTools(prevState => !prevState);
    }

    const setSorting = value => {
        dispatch(setRouteSetting("sort", value));
    }

    return (
        <div className="sortingPanel">
            <div>{`найдено ${routes.total_count}`}</div>
            <div className="sortingBox">
                сортировать по:
                <div className="sortBy" onClick={showSort}>{
                    routeSet.sort === 'date' ? 'дате' : routeSet.sort === 'price_min' ? 'стоимости' : 'длительности' 
                }
                {sortTools && 
                    <ul className="sortingList">
                        <li className="sortingItem" onClick={() => setSorting('date')}>времени</li>
                        <li className="sortingItem" onClick={() => setSorting('price_min')}>стоимости</li>
                        <li className="sortingItem" onClick={() => setSorting('duration')}>длительности</li>
                    </ul>
                }
                </div>
                <div className="limitsBox">показывать по:
                    <span onClick={() => changeLimit(5)} className={routeSet.limit === 5 ? "limitNumber choosenSortItem" : "limitNumber"}>5</span>
                    <span onClick={() => changeLimit(10)} className={routeSet.limit === 10 ? "limitNumber choosenSortItem" : "limitNumber"}>10</span>
                    <span onClick={() => changeLimit(20)} className={routeSet.limit === 20 ? "limitNumber choosenSortItem" : "limitNumber"}>20</span>
                </div>
            </div>
        </div>
    )
}

export default SortingPanel;