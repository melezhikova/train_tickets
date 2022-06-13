import { useEffect, useState } from "react";

function TrainCoach (props) {

    const { coach, type } = props;

    const [coachSeats, setCoachSeats] = useState({
        bottom: 0,
        top: 0,
        all: 0,
    });
    const [ services, setServices ] = useState({
        air_conditioning: false,
        wifi: false,
        linens: false,
        food: false,
    })
    const [ vision, setVision ] = useState({
        air_conditioning: false,
        wifi: false,
        linens: false,
        food: false,
    })

    useEffect(() => {
        let bottom = 0;
        let top = 0;
        let all = 0;
        if(coach) {
            if (type === 'second' || type === 'third') {
                coach.seats.forEach(item => {
                    if(item.available) {
                        if(item.index % 2 === 0) {
                            top += 1;
                        } else {
                            bottom += 1;
                        }
                    }
                })
            }
        }
        if(coach) {
            coach.seats.forEach(item => {
                if(item.available) {
                    all += 1
                }
            })
        }
        setCoachSeats(prevState => ({...prevState, bottom, top, all}));
    },[coach])

    const handleChange = service => {
        if (type !== "first") {
            setServices(prevState => (services[service] === false ? {...prevState, [service]: true} : {...prevState, [service]: false}))
        }
        if (type === "first" && service === 'food') {
            setServices(prevState => (services[service] === false ? {...prevState, [service]: true} : {...prevState, [service]: false}))
        }
    }

    const toggleVision = service => {
        console.log(vision[service]);
        setVision(prevState => (vision[service] === false ? {...prevState, [service]: true} : {...prevState, [service]: false}))
    }

    return (
        <div className="seats_coachDetails">
            <div className="seats_coachDetails_coach">
                <div className="seats_coachDetails_coachNumber">{coach.coach.name}</div>
                <div>вагон</div>
            </div>
            <div className="seats_coachDetails_item">
                <div className="seats_coachDetails_itemHeader">
                    <div>Места</div>
                    <div className="seats_coachDetails_itemNumber">{coachSeats.all}</div>
                </div>
                {coachSeats.top !== 0 && <div className="seats_coachDetails_itemText">
                    <div>Верхние</div>
                    <div className="seats_coachDetails_itemText_quantity">{coachSeats.top}</div>
                </div>}
                {coachSeats.bottom !== 0 && <div className="seats_coachDetails_itemText">
                    <div>Нижние</div>
                    <div className="seats_coachDetails_itemText_quantity">{coachSeats.bottom}</div>
                </div>}
            </div>
            <div className="seats_coachDetails_item">
                <div className="seats_coachDetails_itemHeader">Стоимость</div>
                {coachSeats.top !== 0 && <div className="seats_coachDetails_itemText">
                    <div className="seats_coachDetails_price">{coach.coach.top_price.toLocaleString()}</div>
                    <div className="seatsPriceСurrency"></div>
                </div>}
                {coachSeats.bottom !== 0 && <div className="seats_coachDetails_itemText">
                    <div className="seats_coachDetails_price">{coach.coach.bottom_price.toLocaleString()}</div>
                    <div className="seatsPriceСurrency"></div>
                </div>}
                {type === 'first' && <div className="seats_coachDetails_itemText">
                    <div className="seats_coachDetails_price">{coach.coach.price.toLocaleString()}</div>
                    <div className="seatsPriceСurrency"></div>
                </div>}
            </div>
            <div className="seats_coachDetails_item">
                <div className="seats_coachDetails_itemHeader">
                    <div>Обслуживание</div>
                    <div className="seats_coachDetails_itemHeader_text">ФПК</div>
                </div>
                <div className="seats_coachDetails_servises">
                    <div onClick={() => handleChange('air_conditioning')} className={type === "first" ? "seats_coachDetails_serviceBox serviceBox_notActive" :
                    services.air_conditioning ? "seats_coachDetails_serviceBox seats_coachDetails_serviceBox_active" : "seats_coachDetails_serviceBox"}
                    onMouseEnter={() => toggleVision('air_conditioning')} onMouseLeave={() => toggleVision('air_conditioning')}>
                        <div className={type === "first" ? "seats_coachDetails_servicePic_notActive servicePic_air_conditioning" :
                        services.air_conditioning ? "seats_coachDetails_servicePic servicePic_air_conditioning_active" : "seats_coachDetails_servicePic servicePic_air_conditioning"}></div>
                        {vision.air_conditioning && <div className="tipBox tipBox_services">кондиционер</div>}
                    </div>
                    <div onClick={() => handleChange('wifi')} className={type === "first" ? "seats_coachDetails_serviceBox serviceBox_notActive" :
                    services.wifi ? "seats_coachDetails_serviceBox seats_coachDetails_serviceBox_active" : "seats_coachDetails_serviceBox"}
                    onMouseEnter={() => toggleVision('wifi')} onMouseLeave={() => toggleVision('wifi')}>
                        <div className={type === "first" ? "seats_coachDetails_servicePic_notActive servicePic_wifi" :
                        services.wifi ? "seats_coachDetails_servicePic servicePic_wifi_active" : "seats_coachDetails_servicePic servicePic_wifi"}></div>
                        {vision.wifi && <div className="tipBox tipBox_services">WI&#8209;FI</div>}
                    </div>
                    <div onClick={() => handleChange('linens')} className={type === "first" ? "seats_coachDetails_serviceBox serviceBox_notActive" :
                    services.linens ? "seats_coachDetails_serviceBox seats_coachDetails_serviceBox_active" : "seats_coachDetails_serviceBox"}
                    onMouseEnter={() => toggleVision('linens')} onMouseLeave={() => toggleVision('linens')}>
                        <div className={type === "first" ? "seats_coachDetails_servicePic_notActive servicePic_linen" :
                        services.linens ? "seats_coachDetails_servicePic servicePic_linen_active" : "seats_coachDetails_servicePic servicePic_linen"}></div>
                        {vision.linens && <div className="tipBox tipBox_services">белье</div>}
                    </div>
                    <div onClick={() => handleChange('food')} className={services.food ? "seats_coachDetails_serviceBox seats_coachDetails_serviceBox_active" : "seats_coachDetails_serviceBox"}
                    onMouseEnter={() => toggleVision('food')} onMouseLeave={() => toggleVision('food')}>
                        <div className={services.food ? "seats_coachDetails_servicePic servicePic_food_active" : "seats_coachDetails_servicePic servicePic_food"}></div>
                        {vision.food && <div className="tipBox tipBox_services">питание</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainCoach;