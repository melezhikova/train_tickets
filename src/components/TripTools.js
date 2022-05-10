import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRouteSetting } from "../actions/actionCreators";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css";

function TripTools () {

    registerLocale('ru', ru);
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

    const handleChange = (name, value) => {
        dispatch(setRouteSetting(`${name}_from`, value.min));
        dispatch(setRouteSetting(`${name}_to`, value.max));
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
                <div className="formDiscription">Дата поездки</div>
                <div className="dateInput">
                    <DatePicker 
                        dateFormat="yyyy-MM-dd"
                        locale="ru" 
                        selected={routeSet.date_start} 
                        onChange={(date) => dispatch(setRouteSetting("date_start", date))}
                        className="formControl formControlInTripTools" 
                        placeholderText={"ДД/ММ/ГГ"} 
                        shouldCloseOnSelect={false}
                    />
                </div>
                <div className="formDiscription" htmlFor="dateTo">Дата возвращения</div>
                <div className="dateInput">
                    <DatePicker 
                        dateFormat="yyyy-MM-dd"
                        locale="ru" 
                        selected={routeSet.date_end} 
                        onChange={(date) => dispatch(setRouteSetting("date_end", date))} 
                        className="formControl formControlInTripTools" 
                        placeholderText={"ДД/ММ/ГГ"} 
                        shouldCloseOnSelect={false}
                    />
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
                <div className="formDiscription">Стоимость</div>
                <div className="fromToTitle">
                    <div className="fromToTitle_text">от</div>
                    <div className="fromToTitle_text">до</div>
                </div>
                <InputRange 
                    maxValue={10000}
                    minValue={0}
                    value={{min: routeSet.price_from, max: routeSet.price_to}}
                    onChange={value => handleChange('price', value)} 
                />
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
                    <div className="tripTollsTimeDiscription">Время отбытия</div>
                    <InputRange 
                        maxValue={24}
                        minValue={0}
                        formatLabel={value => value + ":00"}
                        value={{min: routeSet.start_departure_hour_from, max: routeSet.start_departure_hour_to}}
                        onChange={value => handleChange('start_departure_hour', value)} 
                    />
                    <div className="tripTollsTimeDiscription tripTollsTimeDiscriptionBack">Время прибытия</div>
                    <InputRange 
                        maxValue={24}
                        minValue={0}
                        formatLabel={value => value + ":00"}
                        value={{min: routeSet.start_arrival_hour_from, max: routeSet.start_arrival_hour_to}}
                        onChange={value => handleChange('start_arrival_hour', value)} 
                    />
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
                    <div className="tripTollsTimeDiscription">Время отбытия</div>
                    <InputRange 
                        maxValue={24}
                        minValue={0}
                        formatLabel={value => value + ":00"}
                        value={{min: routeSet.end_departure_hour_from, max: routeSet.end_departure_hour_to}}
                        onChange={value => handleChange('end_departure_hour', value)} 
                    />
                    <div className="tripTollsTimeDiscription tripTollsTimeDiscriptionBack">Время прибытия</div>
                    <InputRange 
                        maxValue={24}
                        minValue={0}
                        formatLabel={value => value + ":00"}
                        value={{min: routeSet.end_arrival_hour_from, max: routeSet.end_arrival_hour_to}}
                        onChange={value => handleChange('end_arrival_hour', value)} 
                    />
                </div>
            </div>
        </form>
    )
}

export default TripTools;