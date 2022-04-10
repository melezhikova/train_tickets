function Stage (props) {
    
    const { stage } = props;

    return (
        <section className="stageBar">
            <div className="stageItem stageItemActive">
                <div className="stageNumber">1</div>
                <div className="stageName">Билеты</div>
            </div>
            <div className="stageArrowActive"></div>
            <div className={stage > 1 ? "stageItem stageItemActive" : "stageItem"}>
                <div className="stageNumber">2</div>
                <div className="stageName">Пассажиры</div>
            </div>
            <div className={stage > 1 ? "stageArrowActive" : "stageArrow"}></div>
            <div className={stage > 2 ? "stageItem stageItemActive" : "stageItem"}>
                <div className="stageNumber">3</div>
                <div className="stageName">Оплата</div>
            </div>
            <div className={stage > 2 ? "stageArrowActive" : "stageArrow"}></div>
            <div className={stage > 3 ? "stageItem stageItemActive" : "stageItem"}>
                <div className="stageNumber">4</div>
                <div className="stageName">Проверка</div>
            </div>
        </section>
    )
}

export default Stage;