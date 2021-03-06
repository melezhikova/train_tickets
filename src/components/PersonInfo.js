import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import { changePassengerField, setNewPassenger, setPassengerComplete } from "../actions/actionCreators";
registerLocale('ru', ru);

function PersonInfo (props) {

    const { number } = props;
    const { passengers } = useSelector(state => state.passengers);
    const dispatch = useDispatch();
    
    const [ vision, setVision ] = useState(number === 1 ? true : false);
    const [ index, setIndex ] = useState(passengers.findIndex(item => item.number === number) !== -1 ? passengers.findIndex(item => item.number === number) : "");
    const [ errorText, setErrorText ] = useState({
        invalid: null,
        text: null,
        example: null,
    });
    const [ completedPassengers, setCompletedPassengers ] = useState(0);
    const [ show, setShow ] = useState({
        'is_adult': false,
        'document_type': false,
    });
   
    useEffect(() => {
        let readyPass = 0;
        passengers.forEach(item => {
            if (item.complete) {
                readyPass += 1;
            }
        })
        setCompletedPassengers(readyPass);
        if (index === "" && passengers.findIndex(item => item.number === number) === -1) {
            dispatch(setNewPassenger(number));
        }
        if (completedPassengers + 1 >= number) {
            setVision(true);
        }
        if (passengers.length > 0 && index === "") {
            setIndex(passengers.findIndex(item => item.number === number));
        }
    },[number, passengers, index, dispatch])

    const toggleVision = () => {
        setVision(!vision);
    }

    const showList = name => {
        setShow(prevState => (prevState[name] === true ? {...prevState, [name]: false} : {...prevState, [name]: true}));
    }

    const handleChoose = (name, value) => {
        dispatch(changePassengerField(name, value, number));
        showList(name);
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        dispatch(changePassengerField(name, value, number));
    }

    const inpitChecking = evt => {
        let text = null;
        let example = null;
        let invalid = null;
        const {name, value} = evt.target;
        if (name === errorText.invalid) {
            if (name === "last_name" || name === "first_name" || name === "patronymic") {
                if (passengers[index][name] === "") {
                    if (name === "last_name") {
                        text = "???????????????????? ???????????? ???????????? ?? ?????????????? ??????????????????";
                        invalid = "last_name";
                    }
                    if (name === "first_name") {
                        text = "???????????????????? ???????????? ???????????? ???? ?????????? ??????????????????";
                        invalid = "first_name";
                    }
                    if (name === "patronymic") {
                        text = "???????????????????? ???????????? ???????????? ???? ???????????????? ??????????????????";
                        invalid = "patronymic";
                    }
                }
            }
            if (name === "documentSeries") {
                if (!/^[0-9]{4}/.test(value)) {
                    text = "C???????? ???????????????? ?????????????? ??????????????????????";
                    example = "1 2 3 4";
                    invalid = "documentSeries";
                } 
            }
            if (name === "documentNumber") {
                if (passengers[index].document_type === "??????????????") {
                    if (!/^[0-9]{6}/.test(passengers[index].documentNumber)) {
                        text = "?????????? ???????????????? ???????????? ??????????????????????";
                        example = "1 2 3 4 5 6";
                        invalid = "documentNumber";
                    }
                } else {
                    if(!/^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][??-??]{2}[-][0-9]{6}/.test(value)) {
                        text = "?????????? ?????????????????????????? ?? ???????????????? ???????????? ??????????????????????";
                        example = "VIII-????-123456";
                        invalid = "documentNumber";
                    }
                }
            }
            setErrorText(prevState => ({...prevState, invalid, text, example}));
        }
        
    }

    const checkDate = () => {
        let text = null;
        let invalid = null;
        if (passengers[index].birthday === "") {
            text = "?????????????? ???????? ???????????????? ??????????????????";
            invalid = "birthday";
        }
        setErrorText(prevState => ({...prevState, invalid, text}));
    }

    const checkingForm = () => {
        let text = null;
        let example = null;
        let invalid = null;
        if (passengers[index].last_name === "") {
            text = "???????????????????? ???????????? ???????????? ?? ?????????????? ??????????????????";
            invalid = "last_name";
        } else if (passengers[index].first_name === "") {
            text = "???????????????????? ???????????? ???????????? ???? ?????????? ??????????????????";
            invalid = "first_name";
        } else if (passengers[index].patronymic === "") {
            text = "???????????????????? ???????????? ???????????? ???? ???????????????? ??????????????????";
            invalid = "patronymic";
        } else if (passengers[index].birthday === "") {
            text = "?????????????? ???????? ???????????????? ??????????????????";
            invalid = "birthday";
        } else if (passengers[index].document_type === "??????????????") {
            if (!/^[0-9]{4}/.test(passengers[index].documentSeries)) {
                text = "C???????? ???????????????? ?????????????? ??????????????????????";
                example = "1 2 3 4";
                invalid = "documentSeries";
            } else if (!/^[0-9]{6}/.test(passengers[index].documentNumber)) {
                text = "?????????? ???????????????? ???????????? ??????????????????????";
                example = "1 2 3 4 5 6";
                invalid = "documentNumber";
            }
        } else if (passengers[index].document_type === "?????????????????????????? ?? ????????????????") {
            if (!/^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][??-??]{2}[-][0-9]{6}/.test(passengers[index].documentNumber)) {
                text = "?????????? ?????????????????????????? ?? ???????????????? ???????????? ??????????????????????";
                example = "VIII-????-123456";
                invalid = "documentNumber";
            }
        }

        setErrorText(prevState => ({...prevState, invalid, text, example}));
        if (text !== null) {
            return false;
        } else {
            return true;
        }
    
    }

    const deletePassenger = () => {
        dispatch(deletePassenger(index));
    }

    const handleSubmit = evt => {
        evt.preventDefault();
        const check = checkingForm ();
        if (check) {
            dispatch(setPassengerComplete(index));
        }
    }

    return (
        <section className="personInfo">
            <div className="personInfo_header">
                <div className="personInfo_headerBox">
                    <div onClick={toggleVision} className={vision ? "personInfo_openBtnOpened" : "personInfo_openBtnClosed"}></div>
                    <div>????????????????</div>
                    <div className="personInfo_number">{number}</div>
                </div>
                <div onClick={deletePassenger} className="personInfo_deleteBtn"></div>
            </div>
            {vision && <form onSubmit={handleSubmit} className="personInfo_form">
                <div className="personInfo_choosing personInfo_isAdult">{passengers[index]?.is_adult === true ? '????????????????' : '??????????????'}
                    <div className="personInfo_choosingArrow" onClick={() => showList('is_adult')}></div>
                    {show.is_adult && <ul className="personInfo_list">
                            <li className="personInfo_listItem" onClick={() => handleChoose("is_adult", true)}>????????????????</li>
                            <li className="personInfo_listItem" onClick={() => handleChoose("is_adult", false)}>??????????????</li>
                    </ul>}
                </div>
                <div className="personInfo_formRow personInfo_formRowName">
                    <div className="personInfo_nameBox">
                        <label className="personInfo_label" htmlFor="last_name">??????????????</label>
                        <input className={errorText.invalid === "last_name" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"} 
                        onChange={handleChange} onBlur={inpitChecking} id="last_name" value={passengers[index]?.last_name} name="last_name" required />
                    </div>
                    <div className="personInfo_nameBox">
                        <label className="personInfo_label" htmlFor="first_name">??????</label>
                        <input className={errorText.invalid === "first_name" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"}
                        onChange={handleChange} onBlur={inpitChecking} id="first_name" value={passengers[index]?.first_name} name="first_name" required />
                    </div>
                    <div className="personInfo_nameBox">
                        <label className="personInfo_label" htmlFor="patronymic">????????????????</label>
                        <input className={errorText.invalid === "patronymic" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"} 
                        onChange={handleChange} onBlur={inpitChecking} id="patronymic" value={passengers[index]?.patronymic} name="patronymic" required />
                    </div>
                </div>
                <div className="personInfo_formRow">
                    <div>
                        <div className="personInfo_label">??????</div>
                        <div className="personInfo_chooseGender">
                            <div className={passengers[index]?.gender ? "personInfo_genderItem personInfo_genderItemActive" : "personInfo_genderItem"} 
                            onClick={() => handleChoose("gender", true)}>??</div>
                            <div className={passengers[index]?.gender ? "personInfo_genderItem" : "personInfo_genderItem personInfo_genderItemActive"} 
                            onClick={() => handleChoose("gender", false)}>??</div>
                        </div>
                    </div>
                    <div>
                        <div className="personInfo_label">???????? ????????????????</div>
                        <div>
                            <DatePicker 
                                dateFormat="yyyy-MM-dd"
                                locale="ru" 
                                selected={passengers[index]?.birthday}
                                onChange={(date) => handleChoose("birthday", date)}
                                className={errorText.invalid === "birthday" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"}
                                placeholderText={"????/????/????"} 
                                onBlur={checkDate}
                            />
                        </div>
                    </div>
                </div>
                <div className="personInfo_formRow">
                    <input className="personInfo_checkbox" type="checkbox" />
                    <div className="personInfo_text">???????????????????????? ??????????????????????</div>
                </div>
                <div className="personInfo_formRow personInfo_formRowDocs">
                    <div>
                        <div className="personInfo_label">?????? ??????????????????</div>
                        <div className="personInfo_choosing personInfo_documentType">{passengers[index]?.document_type}
                            <div className="personInfo_choosingArrow" onClick={() => showList("document_type")}></div>
                            {show.document_type && <ul className="personInfo_list">
                                    <li className="personInfo_listItem" onClick={() => handleChoose("document_type", "??????????????")}>??????????????</li>
                                    <li className="personInfo_listItem" onClick={() => handleChoose("document_type", "?????????????????????????? ?? ????????????????")}>?????????????????????????? ?? ????????????????</li>
                            </ul>}
                        </div>
                    </div>
                    {passengers[index]?.document_type === "??????????????" && <div className="personInfo_docsBox">
                        <label className="personInfo_label" htmlFor="documentSeries">??????????</label>
                        <input className={errorText.invalid === "documentSeries" ? "personInfo_formControl formcontrolPassort personInfo_formControlInvalid" : "personInfo_formControl formcontrolPassort"} 
                        onChange={handleChange} id="documentSeries" value={passengers[index]?.documentSeries} placeholder="_ _ _ _" pattern="[0-9]{4}" maxLength="4" onBlur={inpitChecking} required name="documentSeries" />
                    </div>}
                    <div className="personInfo_docsBox">
                        <label className="personInfo_label" htmlFor="documentNumber">??????????</label>
                        {passengers[index]?.document_type === "??????????????" && 
                        <input className={errorText.invalid === "documentSeries" ? "personInfo_formControl formcontrolPassort personInfo_formControlInvalid" : "personInfo_formControl formcontrolPassort"} 
                        onChange={handleChange} id="documentNumber" value={passengers[index]?.documentNumber} placeholder="_ _ _ _ _ _" pattern="[0-9]{6}" maxLength="6" name="documentNumber" onBlur={inpitChecking} required />}
                        {passengers[index]?.document_type === "?????????????????????????? ?? ????????????????" && <div className="formcontrol??ertificate">
                            <input className={errorText.invalid === "documentNumber" ? "personInfo_formControl formcontrol??ertificateInput personInfo_formControlInvalid" : "personInfo_formControl formcontrol??ertificateInput"} 
                            onChange={handleChange} id="documentNumber" value={passengers[index]?.documentNumber} name="documentNumber" onBlur={inpitChecking} maxLength="14" required 
                            pattern="M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][??-??]{2}[-][0-9]{6}" />
                            {passengers[index]?.documentNumber === null && <div className="formcontrol??ertificatePlaceholder">12 ????????????????<br></br>_ _ _ _ _ _ _ _ _ _ _ _</div>}
                        </div>}
                    </div>
                </div>
                {errorText.text === null && <div className={passengers[index]?.complete ? "btnBox personInfo_btnBox personInfo_btnBoxFormComplete" : "btnBox personInfo_btnBox"}>
                    {passengers[index]?.complete && <div className="personInfo_completeBox">
                        <div className="personInfo_completePic"></div>
                        <div className="personInfo_completeText">????????????</div>
                    </div>}
                    <button className={passengers[index]?.complete ? "whiteBtn personInfo_completeBtn" : "whiteBtn"} type="submit" onClick={handleSubmit}>?????????????????? ????????????????</button>
                </div>}
                {errorText.text && <div className="personInfo_errorBox">
                    <div className="personInfo_errorPic"></div>
                    <div>
                        <div>{errorText.text}</div>
                        {errorText.example && <div>????????????: 
                            <span className="personInfo_example">{errorText.example}</span>
                        </div>}
                    </div>
                </div>}
            </form>}
        </section>
    )
}

export default PersonInfo;