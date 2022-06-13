import { useState } from "react";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import TripDetailsRoute from "./TripDetailsRoute";

function TripDetails () {

    const { route, quantity } = useSelector(state => state.seats);
    const [vision, setVision] = useState({
        start: false,
        end: false,
        passengers: false,
    });

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
                {vision.start && <TripDetailsRoute train={route.departure} />}
            </div>
            <div className="tripToolsSection">
                <div className="tripToolsSectionHeader">
                    <div className="tripToolsSectionHeaderBox">
                        <div className="tripToolsSectionHeaderPicThere"></div>
                        <div className="tripToolsSectionHeaderText">Обратно</div>
                    </div>
                    <div onClick={() => togglevision('end')} className={vision.end ? "tripToolsSectionHeaderToggle opened" : "tripToolsSectionHeaderToggle closed"}></div>
                </div>    
                {vision.end && <TripDetailsRoute train={route.departure} />}
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
                            <div>{quantity.adultQuantity === 1 ? "Взрослый" : "Взрослых"}</div>
                        </div>
                        <div className="tripDetails_sectionRowPart">
                            <div className="tripDetails_trainPrice">{}</div>
                            <div className="seatsPriceСurrency"></div>
                        </div>
                    </div>   
                    {quantity.childQuantity > 0 &&  <div className="tripDetails_sectionRow">
                        <div className="tripDetails_sectionRowPart">
                            <div  className="tripDetails_passQuantity">{quantity.childQuantity}</div>
                            <div>{quantity.childQuantity === 1 ? "Ребенок" : "Детей"}</div>
                        </div>
                        <div className="tripDetails_sectionRowPart">
                            <div className="tripDetails_trainPrice">{}</div>
                            <div className="seatsPriceСurrency"></div>
                        </div>
                    </div>}
                </div>}
            </div>
            <div className="tripToolsSection">
                <div className="tripToolsSectionHeader">
                    <div className="tripToolsSectionHeaderText">ИТОГ</div>
                    <div>
                        <div></div>
                        <div className="seatsPriceСurrency"></div>
                    </div>
                </div>   
            </div>
        </div>
    )
}

export default TripDetails;