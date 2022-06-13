import HeaderForm from "./HeaderForm";
import Menu from "./Menu";

function SecondaryHeader () {
    return (
        <header className="secondaryHeader">
            <a href="/#logo" id="logo" className="logo">Лого</a>
            <Menu />
            <div className="SecondaryHeaderContainer">
                <HeaderForm typeForm="secondaryHeaderForm" lines="inOneLine"/>
            </div>
        </header>
    )
}

export default SecondaryHeader;