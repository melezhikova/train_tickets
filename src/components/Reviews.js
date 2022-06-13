import { useState } from "react";
import quotation from "../img/review/quotationEnd.png";

function Reviews () {

    const data = [
        {
            first: {
                author: 'Екатерина Вальнова',
                text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
            },
            second: {
                author: 'Евгений Стрыкало',
                text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
            }  
        },
        {
            first: {
                author: 'Оля Петрова',
                text: 'Все круто, мне все понравилось:). Интуитивно понятный интерфейс. Здорово!'
            },
            second: {
                author: 'Вася Иванов',
                text: 'Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
            }  
        },
        {
            first: {
                author: 'Маша Сидорова',
                text: 'Даже если вы заказываете онлайн билет впервые, у вас все получится. Бывают хорошие скидки.'
            },
            second: {
                author: 'Коля Васечкин',
                text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
            }  
        },
        {
            first: {
                author: 'Вика Виктория',
                text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
            },
            second: {
                author: 'Антон Яблоневый',
                text: 'СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
            }  
        },
        {
            first: {
                author: 'Таня Рыбкина',
                text: 'Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.'
            },
            second: {
                author: 'Петя Тихонов',
                text: 'Сразу после оплаты ж/д билетов и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.'
            }  
        }
    ]
    const [ number, setNumber ] = useState(0);

    return (
        <div className="reviews" id="reviews">
            <div className="reviewsTitle">ОТЗЫВЫ</div>
            <div className="reviewsContainer">
                <div className="reviewItem">
                    <div className="reviewAuthorAvatar author1"></div>
                    <div className="reviewBox">
                        <div className="reviewAuthorName">{data[number].first.author}</div>
                        <div className="quotationStart"></div>
                        <div className="reviewText">{data[number].first.text}
                            <img src={quotation} className="quotationEnd" />
                        </div>
                    </div>
                </div>
                <div className="reviewItem">
                    <div className="reviewAuthorAvatar author2"></div>
                    <div className="reviewBox">
                        <div className="reviewAuthorName">{data[number].second.author}</div>
                        <div className="quotationStart"></div>
                        <div className="reviewText">{data[number].second.text}
                            <img src={quotation} className="quotationEnd" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviewsControls">
                <div onClick={()=>setNumber(0)} className={number === 0 ? "reviewControl reviewControlActive" : "reviewControl"}></div>
                <div onClick={()=>setNumber(1)} className={number === 1 ? "reviewControl reviewControlActive" : "reviewControl"}></div>
                <div onClick={()=>setNumber(2)} className={number === 2 ? "reviewControl reviewControlActive" : "reviewControl"}></div>
                <div onClick={()=>setNumber(3)} className={number === 3 ? "reviewControl reviewControlActive" : "reviewControl"}></div>
                <div onClick={()=>setNumber(4)} className={number === 4 ? "reviewControl reviewControlActive" : "reviewControl"}></div>
            </div>
        </div>
    )
}

export default Reviews;