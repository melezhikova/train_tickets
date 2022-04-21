import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRouteSetting } from "../actions/actionCreators";

function TripTools () {

    const { routeSet } = useSelector(state => state.routeSettings);
    const dispatch = useDispatch();
    const tools = [
        {id: 1, rus: 'Купе', eng: 'compartmentWagon', name: 'have_second_class', value: routeSet.have_second_class},
        {id: 2, rus: 'Плацкарт', eng: 'reservedWagon', name: 'have_third_class', value: routeSet.have_third_class},
        {id: 3, rus: 'Сидячий', eng: 'sittingWagon', name: 'have_fourth_class', value: routeSet.have_fourth_class},
        {id: 4, rus: 'Люкс', eng: 'luxWagon', name: 'have_first_class', value: routeSet.have_first_class},
        {id: 5, rus: 'Wi-Fi', eng: 'wifiWagon', name: 'have_wifi', value: routeSet.have_wifi},
        {id: 6, rus: 'Экспресс', eng: 'express', name: 'have_express', value: routeSet.have_express},
    ]

    const [visionThere, setVisionThere] = useState(false);
    const [visionBack, setVisionBack] = useState(false);

    const handleChange = evt => {
        const { name, value } = evt.target;
        dispatch(setRouteSetting(name, value));
    }

    const toggleTools = (name, value) => {
        const newValue = !value;
        dispatch(setRouteSetting(name, newValue));
    }

    const toggleVisionThere = () => {
        setVisionThere(prevState => !prevState)
    }

    const toggleVisionBack = () => {
        setVisionBack(prevState => !prevState)
    }

    return (
        <form className="tripTools">
            <div className="tripToolsSection">
                <label className="formDiscription" htmlFor="dateFrom">Дата поездки</label>
                <div className="dateInput">
                    <input onChange={handleChange} value={routeSet.date_start} type="date" id="dateFrom" name="dateFrom" className="formControl" />
                </div>
                <label className="formDiscription" htmlFor="dateTo">Дата возвращения</label>
                <div className="dateInput">
                    <input onChange={handleChange} value={routeSet.date_end} type="date" id="dateTo" name="dateTo" className="formControl" />
                </div>
            </div>
            <div className="tripToolsSection">
                {tools.map(o => (
                    <div key={o.id} className="tripTollsItem">
                        <div className={`tripTollsItemPic ${o.eng}`}></div>
                        <div className="tripTollsItemDiscripton">{o.rus}</div>
                        <div className={o.value ? "tripTollsItemSwitchFalse" : "tripTollsItemSwitchTrue"} 
                            onClick={() => toggleTools(o.name, o.value)}></div>
                    </div>
                ))}
            </div>
            <div className="tripToolsSection">
                <label className="formDiscription" htmlFor="cost">Стоимость</label>
                <input className="tripTollsCost" onChange={handleChange} id="cost" name="cost" type="range" multiple></input>
            </div>
            <div className="tripToolsSection">
                <div className="tripToolsSectionHeader">
                    <div className="tripToolsSectionHeaderBox">
                        <div className="tripToolsSectionHeaderPicThere"></div>
                        <div className="tripToolsSectionHeaderText">Туда</div>
                    </div>
                    <div onClick={toggleVisionThere} className={visionThere ? "tripToolsSectionHeaderToggle opened" : "tripToolsSectionHeaderToggle closed"}></div>
                </div>    
                <div className={visionThere ? "" : "visually-hidden"}>
                    <label className="tripTollsTimeDiscription" htmlFor="departureTimeThere">Время отбытия</label>
                    <input className="tripTollsTime" min="0:00" max="24:00" step="1:00" onChange={handleChange} id="departureTimeThere" name="departureTimeThere" type="range"></input>
                    <label className="tripTollsTimeDiscription tripTollsTimeDiscriptionBack" htmlFor="arrivalTimeThere">Время прибытия</label>
                    <input className="tripTollsTime" onChange={handleChange} id="arrivalTimeThere" name="arrivalTimeThere" type="range"></input>
                </div>
            </div>
            <div className="tripToolsSection">
                <div className="tripToolsSectionHeader">
                    <div className="tripToolsSectionHeaderBox">
                        <div className="tripToolsSectionHeaderPicBack"></div>
                        <div className="tripToolsSectionHeaderText">Обратно</div>
                    </div>
                    <div onClick={toggleVisionBack} className={visionBack ? "tripToolsSectionHeaderToggle opened" : "tripToolsSectionHeaderToggle closed"}></div>
                 </div>    
                <div className={visionBack ? "" : "visually-hidden"}>
                    <label className="tripTollsTimeDiscription" htmlFor="departureTimeBack">Время отбытия</label>
                    <input className="tripTollsTime" onChange={handleChange} id="departureTimeBack" name="departureTimeBack" type="range"></input>
                    <label className="tripTollsTimeDiscription tripTollsTimeDiscriptionBack" htmlFor="arrivalTimeBack">Время прибытия</label>
                    <input className="tripTollsTime" onChange={handleChange} id="arrivalTimeBack" name="arrivalTimeBack" type="range"></input>
                </div>
            </div>
        </form>
    )
}

export default TripTools;