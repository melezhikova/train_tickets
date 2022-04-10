import { Link } from 'react-router-dom';

function HowItWorks () {

    return (
        <section className="howItWorksSection" id="howItWorks">
            <div className="howItWorksContainer">
                <div className="howItWorksHeader">как это работает</div>
                <Link to="/" className="howItWorksLink">
                    Узнать больше
                </Link>
            </div>
            <div className="benefitsBox">
                <div className="benefit">
                    <div className="benefitPic benefitFirst"></div>
                    <div className="benefitDiscription">Удобный заказ на сайте</div>
                </div>
                <div className="benefit">
                    <div className="benefitPic benefitSecond"></div>
                    <div className="benefitDiscription">Нет необходимости ехать в офис</div>
                </div>
                <div className="benefit">
                    <div className="benefitPic benefitThird"></div>
                    <div className="benefitDiscription">Огромный выбор направлений</div>
                </div>
            </div>
        </section>
    )
}

export default HowItWorks;