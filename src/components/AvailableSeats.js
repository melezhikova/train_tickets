import { useState } from "react";

function AvailableSeats (props) {

    const { type, quantity, price, top, bottom, side } = props;
    const [vision, setVision] = useState(false);

    const toggleVision = () => {
        setVision(prevState => !prevState);
    }
    
    return (
        <div className="seatsBox" onMouseEnter={toggleVision} onMouseLeave={toggleVision}>
            <div className="seatsType">{type}</div>
            <div className="seatsDetails">
                <div className="seatsQuantity">{quantity}</div>
                <div className="seatsPrice">
                    <div>от</div>
                    <div className="seatsPriceFigure">{price.toLocaleString()}</div>
                    <div className="seatsPriceСurrency"></div>
                </div>
            </div>
            {vision && (type === 'Плацкарт' || type === 'Купе') &&
                <div className="tipBox">
                    <div className="tipRow">
                        <div className="seatsType">верхнее</div>
                        <div className="seatsDetails">
                            <div className="seatsQuantity">{type === 'Плацкарт' ? (quantity / 3) : (quantity / 2)}</div>
                            <div className="seatsPrice">
                                <div>от</div>
                                <div className="seatsPriceFigure">{top.toLocaleString()}</div>
                                <div className="seatsPriceСurrency"></div>
                            </div>
                        </div>
                    </div>
                    <div className="tipRow">
                        <div className="seatsType">нижнее</div>
                        <div className="seatsDetails">
                            <div className="seatsQuantity">{type === 'Плацкарт' ? (quantity / 3) : (quantity / 2)}</div>
                            <div className="seatsPrice">
                                <div>от</div>
                                <div className="seatsPriceFigure">{bottom.toLocaleString()}</div>
                                <div className="seatsPriceСurrency"></div>
                            </div>
                        </div>
                    </div>
                    {type === 'Плацкарт' &&
                        <div className="tipRow">
                            <div className="seatsType">боковое</div>
                            <div className="seatsDetails">
                                <div className="seatsQuantity">{type === 'Плацкарт' ? (quantity / 3) : (quantity / 2)}</div>
                                <div className="seatsPrice">
                                    <div>от</div>
                                    <div className="seatsPriceFigure">{side.toLocaleString()}</div>
                                    <div className="seatsPriceСurrency"></div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default AvailableSeats;