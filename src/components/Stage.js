import { useNavigate } from "react-router-dom";

function Stage (props) {
    
    const navigate = useNavigate();
    const { stage } = props;

    const goThere = number => {
        if (number === 1) {
            navigate('/tickets');
        } else if (number === 2 && stage > "1") {
            navigate('/passengers');
        } else if (number === 3 && stage > "2") {
            navigate('/paying');
        } else if (number === 3 && stage > "2") {
            navigate('/verify');
        }
    }

    return (
        <section className={stage === "4" ? "stageBar stageBarFull" : "stageBar"}>
            <div onClick={() => goThere(1)} className="stageItem stageItemActive">
                <div className="stageNumber">1</div>
                <div className="stageName">Билеты</div>
            </div>
            <div className={stage === "1" ? "stageArrowActive" : "stageArrow stageArrowPrev"}></div>
            <div onClick={() => goThere(2)} className={stage > "1" ? "stageItem stageItemActive" : "stageItem"}>
                <div className="stageNumber">2</div>
                <div className="stageName">Пассажиры</div>
            </div>
            <div className={
                stage === "2" ? "stageArrowActive" :
                stage > "2" ? "stageArrow stageArrowPrev" : "stageArrow"}></div>
            <div onClick={() => goThere(3)} className={stage > "2" ? "stageItem stageItemActive" : "stageItem"}>
                <div className="stageNumber">3</div>
                <div className="stageName">Оплата</div>
            </div>
            <div className={
                stage === "3" ? "stageArrowActive" :
                stage > "3" ? "stageArrow stageArrowPrev" : "stageArrow"}></div>
            <div onClick={() => goThere(4)} className={stage > "3" ? "stageItem stageItemActive" : "stageItem"}>
                <div className="stageNumber">4</div>
                <div className="stageName">Проверка</div>
            </div>
        </section>
    )
}

export default Stage;