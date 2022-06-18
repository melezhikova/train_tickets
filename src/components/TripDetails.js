import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import TripDetailsRoute from "./TripDetailsRoute";

function TripDetails () {

    const { route, quantity, choosenSeats } = useSelector(state => state.seats);
    const [ allPlaces, setAllPlaces ] = useState([]);
    const [ adultPrice, setAdultPrice ] = useState(0);
    const [ childPrice, setChildPrice ] = useState(0);
    const [vision, setVision] = useState({
        start: false,
        end: false,
        passengers: false,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        let allPlacesNew = [];
        if (choosenSeats.length > 0) {
            choosenSeats.forEach(item => {
                if(item.seats.length > 0) {
                    item.seats.forEach(place => allPlacesNew.push(place));
                }
            })
        }
        setAllPlaces(allPlacesNew);
    },[choosenSeats])

    useEffect(() => {
        let priceAdult = 0, priceChild = 0;
        if (allPlaces.length > 0) {
            if (quantity.childQuantity * 1 > 0) {
                for (let i = 0; i < quantity.childQuantity * 1; i += 1) {
                    priceChild += allPlaces[i].price;
                }
                if (quantity.adultQuantity * 1 > 0) {
                    for (let i = quantity.childQuantity * 1; i < (quantity.adultQuantity * 1 + quantity.childQuantity * 1); i += 1) {
                        priceAdult += allPlaces[i].price;
                    }
                }
            } else {
                if (quantity.adultQuantity > 0) {
                    for(let i = 0; i < quantity.adultQuantity; i += 1) {
                        priceAdult += allPlaces[i].price;
                    }
                }
            }
        }
        setAdultPrice(priceAdult);
        setChildPrice(priceChild);

    },[quantity, allPlaces, dispatch])

    const togglevision = tool => {
        setVision(prevState => (vision[tool] === false ? {...prevState, [tool]: true} : {...prevState, [tool]: false}));
    }

    return (
        <div className="tripTools tripDetails">
            <div className="tripToolsSection">
                <div className="formDiscription">ДЕТАЛИ ПОЕЗДКИ</div>
            </div>
            <div className="tripToolsSection">
                <div className="tripToolsSectionHeader">
                    <div className="tripToolsSectionHeaderBox">
                        <div className="tripToolsSectionHeaderPicThere"></div>
                        <div className="tripToolsSectionHeaderText">Туда</div>
                        <div className="tripDetails_headerText">{format(new Date(route.departure.from.datetime * 1000),'dd.MM.yyyy')}</div>
                    </div>
                    <div onClick={() => togglevision('start')} className={vision.start ? "tripToolsSectionHeaderToggle opened" : "tripToolsSectionHeaderToggle closed"}></div>
                </div>    
                {vision.start && <TripDetailsRoute train={route.departure} direction="trainStart" />}
            </div>
            <div className="tripToolsSection">
                <div className="tripToolsSectionHeader">
                    <div className="tripToolsSectionHeaderBox">
                        <div className="tripToolsSectionHeaderPicThere"></div>
                        <div className="tripToolsSectionHeaderText">Обратно</div>
                    </div>
                    <div onClick={() => togglevision('end')} className={vision.end ? "tripToolsSectionHeaderToggle opened" : "tripToolsSectionHeaderToggle closed"}></div>
                </div>    
                {vision.end && <TripDetailsRoute train={route.departure} direction="trainEnd" />}
            </div>
            <div className="tripToolsSection">
                <div className="tripToolsSectionHeader">
                    <div className="tripToolsSectionHeaderBox">
                        <div className="tripToolsSectionHeaderPicPassenger"></div>
                        <div className="tripToolsSectionHeaderText">Пассажиры</div>
                    </div>
                    <div onClick={() => togglevision('passengers')} className={vision.passengers ? "tripToolsSectionHeaderToggle opened" : "tripToolsSectionHeaderToggle closed"}></div>
                </div> 
                {vision.passengers && <div>
                    <div className="tripDetails_sectionRow">
                        <div className="tripDetails_sectionRowPart">
                            <div className="tripDetails_passQuantity">{quantity.adultQuantity}</div>
                            <div>{quantity.adultQuantity * 1 === 1 ? "Взрослый" : "Взрослых"}</div>
                        </div>
                        <div className="tripDetails_sectionRowPart">
                            <div className="tripDetails_trainPrice">{adultPrice.toLocaleString()}</div>
                            <div className="seatsPriceСurrency"></div>
                        </div>
                    </div>   
                    {quantity.childQuantity > 0 &&  <div className="tripDetails_sectionRow">
                        <div className="tripDetails_sectionRowPart">
                            <div  className="tripDetails_passQuantity">{quantity.childQuantity}</div>
                            <div>{quantity.childQuantity * 1 === 1 ? "Ребенок" : "Детей"}</div>
                        </div>
                        <div className="tripDetails_sectionRowPart">
                            <div className="tripDetails_trainPrice">{childPrice.toLocaleString()}</div>
                            <div className="seatsPriceСurrency"></div>
                        </div>
                    </div>}
                </div>}
            </div>
            <div className="tripToolsSection">
                <div className="tripToolsSectionHeader tripDetails_sectionTotalPrice">
                    <div className="tripToolsSectionHeaderText">ИТОГ</div>
                    <div className="tripDetails_sectionRowPart">
                        <div className="tripDetails_trainTotalPrice">{(childPrice + adultPrice).toLocaleString()}</div>
                        <div className="seatsPriceСurrency tripDetails_totalPriceСurrency"></div>
                    </div>
                </div>   
            </div>
        </div>
    )
}

export default TripDetails;