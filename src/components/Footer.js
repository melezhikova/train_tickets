import { useSelector, useDispatch } from "react-redux";
import { fetchEmail, changeEmailField } from "../actions/actionCreators";
import Info from "./Info";

function Footer () {

    const { email } = useSelector(state => state.email);
    const { info } = useSelector(state => state.showMessages);

    const dispatch = useDispatch();
    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch(fetchEmail(email));
    }

    const handleChange = evt => {
        const {value} = evt.target;
        dispatch(changeEmailField(value));
    }

    return (
        <footer id="contacts">
            {info && <Info />}
            <div className="footerContainer">
                <div className="footerContacts">
                    <h3 className="footerTitle">Свяжитесь с нами</h3>
                    <ul className="footerContactsList">
                        <li className="footerContactsItem">
                            <div className="footerContactsItemPicture phone"></div>
                            <div className="footerContactsItemText">8 (800) 000 00 00</div>
                        </li>
                        <li className="footerContactsItem">
                            <div className="footerContactsItemPicture mail"></div>
                            <div className="footerContactsItemText">inbox@mail.ru</div>
                        </li>
                        <li className="footerContactsItem">
                            <div className="footerContactsItemPicture skype"></div>
                            <div className="footerContactsItemText">tu.train.tickets</div>
                        </li>
                        <li className="footerContactsItem">
                            <div className="footerContactsItemPicture address"></div>
                            <div className="footerContactsItemText">
                                г. Москва<br /> 
                                ул. Московская 27-35<br />
                                555 555
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="footerSubscription">
                    <h3 className="footerTitle">Подписка</h3>
                    <form className="footerForm" onSubmit={handleSubmit}>
                        <label className="footerFormText" htmlFor="footerForm_email">Будьте в курсе событий</label>
                        <input className="footerFormInput" onChange={handleChange} type="email" placeholder="e-mail" value={email} required></input>
                        <button className="subscriptionButton">ОТПРАВИТЬ</button>
                    </form>
                    <h3 className="footerTitle">Подписывайтесь на нас</h3>
                    <ul className="footer_socialLinks">
                        <li className="socialLink">
                            <a href="http://somewhere" className="socialLinkItem youtube">
                                <span className="visually-hidden">youtube</span>
                            </a>
                        </li>
                        <li className="socialLink">
                            <a href="http://somewhere" className="socialLinkItem linkedin">
                                <span className="visually-hidden">linkedin</span>
                            </a>
                        </li>
                        <li className="socialLink">
                            <a href="http://somewhere" className="socialLinkItem googlePlus">
                                <span className="visually-hidden">googlePlus</span>
                            </a>
                        </li>
                        <li className="socialLink">
                            <a href="http://somewhere" className="socialLinkItem facebook">
                                <span className="visually-hidden">facebook</span>
                            </a>
                        </li>
                        <li className="socialLink">
                            <a href="http://somewhere" className="socialLinkItem twitter">
                                <span className="visually-hidden">twitter</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="copyright">
                <div className="footerLogo">Лого</div>
                <a href="/#mainMenu" className="up"></a>
                <div className="copyrightText">2018 WEB</div>
            </div>
        </footer>
    )
}

export default Footer;