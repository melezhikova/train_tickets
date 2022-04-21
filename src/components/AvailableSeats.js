function AvailableSeats (props) {
    const { type, quantity, price } = props;
    
    return (
        <div className="seatsBox">
            <div className="seatsType">{type}</div>
            <div className="seatsDetails">
                <div className="seatsQuantity">{quantity}</div>
                <div className="seatsPrice">
                    <div>от</div>
                    <div className="seatsPriceFigure">{price}</div>
                    <div className="seatsPriceСurrency"></div>
                </div>
            </div>
        </div>
    )
}

export default AvailableSeats;