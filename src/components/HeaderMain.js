import HeaderForm from "./HeaderForm";
import Menu from "./Menu";

function HeaderMain () {
    return (
        <header className="mainHeader">
            <a href="/#logo" id="logo" className="logo">Лого</a>
            <Menu />
            <div className="mainHeaderContainer">
                <div className="slogan">Вся жизнь - <span className="bold">путешествие!</span></div>
                <HeaderForm typeForm="mainHeaderForm" lines="inTwoLines"/>
            </div>
        </header>
    )
}

export default HeaderMain;