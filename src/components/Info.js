function Info (props) {

    const { messageMain, messageDetails, type } = props;

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
                <div>
                    <button className="popupBtn">ПОНЯТНО</button>
                </div>
            </div>
        </div>
    )
}

export default Info;