function Reviews () {

    return (
        <div className="reviews" id="reviews">
            <div className="reviewsTitle">ОТЗЫВЫ</div>
            <div className="reviewsContainer">
                <div className="reviewItem">
                    <div className="reviewAuthorAvatar author1"></div>
                    <div className="reviewBox">
                        <div className="reviewAuthorName">Екатерина Вальнова</div>
                        <div className="reviewText">
                            Доброжелательные подсказки на всех этапах помогут правильно заполнить поля и без 
                            затруднений купить авиа или ж/д билет, даже если вы заказываете онлайн билет впервые.
                        </div>
                    </div>
                </div>
                <div className="reviewItem">
                    <div className="reviewAuthorAvatar author2"></div>
                    <div className="reviewBox">
                        <div className="reviewAuthorName">Евгений Стрыкало</div>
                        <div className="reviewText">
                            СМС-сопровождение до посадки. Сразу после оплаты ж/д билетов 
                            и за 3 часа до отправления мы пришлем вам СМС-напоминание о поездке.
                        </div>
                    </div>
                </div>
            </div>
            <div className="reviewsControls">
                <div className="reviewControl reviewControlActive"></div>
                <div className="reviewControl"></div>
                <div className="reviewControl"></div>
                <div className="reviewControl"></div>
                <div className="reviewControl"></div>
            </div>
        </div>
    )
}

export default Reviews;