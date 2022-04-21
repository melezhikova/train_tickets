import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { setCurrentPage } from "../actions/actionCreators";

function RoutesPages () {
    const { routeSet, currentPage, routes } = useSelector(state => state.routeSettings);
    const [ allPages, setPages ] = useState([1]);
    const dispatch = useDispatch();

    useEffect(() => {
        let pagesArray = [];
        let quantity = 1;
        if (routes.total_count !== 0) {
            quantity = Math.ceil(routes.total_count / routeSet.limit);
        }
        if (quantity > 1) {
            let i = 1;
            while (i <= quantity) {
                pagesArray.push(i);
                i += 1;
            }
            setPages(pagesArray);
        }
    },[routes.total_count, routeSet.limit]);

    const prevPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    }

    const nextPage = () => {
        if ((currentPage + 1) <= allPages.length) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    }

    const changePage = number => {
        dispatch(setCurrentPage(number));
    }

    return (
        <section className="pages">
            <div className="pages_boxArrow" onClick={prevPage}>
                <div className="pages_leftArrow"></div>
            </div>
            {allPages.map(o => (
                <div key={o} onClick={() => changePage(o)}
                className={o === currentPage ? "pageNumber pageNumberActive" : "pageNumber"}>{o}</div>
            ))}
            <div className="pages_boxArrow" onClick={nextPage}>
                <div className="pages_rightArrow"></div>
            </div>
        </section>
    )
}

export default RoutesPages;