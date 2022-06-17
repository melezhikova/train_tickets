import { useSelector, useDispatch } from "react-redux";
import { closeError } from "../actions/actionCreators";

function Info () {
    
    const { messageMain, messageDetails, type } = useSelector(state => state.showMessages);
    const dispatch = useDispatch();

    const closePopup = () => {
        dispatch(closeError());
    }

    return (
        <div className="popup">
            <div className="popupBox">
                <div className={`popupHeader_${type}`}>
                    <div className="popupHeaderPic"></div>
                </div>
                <div className="popupText">
                    <div className={`popupMessageMain_${type}`}>{messageMain}</div>
                    <div className="messageDetails">{messageDetails}</div>
                </div>
                <div className="btnBox_popup">
                    <button onClick={closePopup} className="whiteBtn">Понятно</button>
                </div>
            </div>
        </div>
    )
}

export default Info;