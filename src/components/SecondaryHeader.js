import HeaderForm from "./HeaderForm";
import Menu from "./Menu";

function SecondaryHeader () {
    return (
        <header className="secondaryHeader">
            <div className="logo">Лого</div>
            <Menu />
            <div className="SecondaryHeaderContainer">
                <HeaderForm typeForm="secondaryHeaderForm" lines="inOneLine"/>
            </div>
        </header>
    )
}

export default SecondaryHeader;