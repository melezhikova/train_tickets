import { useSelector, useDispatch } from "react-redux";
import { changeQuantityField } from "../actions/actionCreators";

function TrainTicketsQuantity () {

    const { quantity } = useSelector(state => state.seats);
    const dispatch = useDispatch();

    const handleChange = evt => {
        const {name, value} = evt.target;
        dispatch(changeQuantityField(name, value));
    };

    return (
        <div className="train_quantityBox">
            <div className="train_quantityItem train_quantityItem_adult">
                <div className="train_quantityItemBox">
                    <div className="train_quantityItemSign">Взрослых -</div>
                    <input onChange={handleChange} type="number" min="1" max="5" name="adultQuantity" className="train_quantityItemInput" value={quantity.adultQuantity}></input>
                </div>
                <div className="train_quantityItemText">
                    {`Можно добавить еще ${5 - quantity.adultQuantity} ${(5 - quantity.adultQuantity) === 1 ? 'пассажира' : 'пассажиров'}`} 
                </div>
            </div>
            <div className="train_quantityItem">
                <div className="train_quantityItemBox">
                    <div className="train_quantityItemSign">Детских -</div>
                    <input onChange={handleChange} type="number" min="0" max="5" name="childQuantity" className="train_quantityItemInput" value={quantity.childQuantity}></input>
                </div>
                <div className="train_quantityItemTextChild">
                    {`Можно добавить еще ${5 - quantity.childQuantity} ${(5 - quantity.childQuantity) === 1 ? 'ребенка' : 'детей'} до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%`} 
                </div>
            </div>
            <div className="train_quantityItem">
                <div className="train_quantityItemBox">
                    <div className="train_quantityItemSign">Детских "без места" -</div>
                    <input onChange={handleChange} type="number" min="0" max="5" name="childWithoutSeatQuantity" className="train_quantityItemInput" value={quantity.childWithoutSeatQuantity}></input>
                </div>
            </div>
        </div>
    )
}

export default TrainTicketsQuantity;