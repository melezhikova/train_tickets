import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Train (props) {
    const { direction } = props;
    const { route } = useSelector(state => state.seats);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect (() => {
        // dispatch(fetchRoutes(routeSet));
    },[])

    const changeTrain = () => {
        navigate('/tickets');
    }
     
    return (
        <div className="train">
            <div className={`header_${direction}`}>
                <div className={`headerPic_${direction}`}></div>
                <button onClick={changeTrain} className="changeTrainBtn btn">Выбрать другой поезд</button>
            </div>
            
        </div>
    )
}

export default Train;