import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import ru from 'date-fns/locale/ru';
import { setPassenger } from "../actions/actionCreators";
registerLocale('ru', ru);

function PersonInfo (props) {

    const { number } = props;
    const { passengers } = useSelector(state => state.seats);
    const dispatch = useDispatch();
    
    const [ vision, setVision ] = useState(number === 1 ? true : false);
    const [ complete, setComplete ] = useState(false);
    const [ index, setIndex ] = useState(passengers.findIndex(item => item.number === number) !== -1 ? passengers.findIndex(item => item.number === number) : null);
    const [ errorText, setErrorText ] = useState({
        invalid: null,
        text: null,
        example: null,
    });
    const [ show, setShow ] = useState({
        'is_adult': false,
        'document_type': false,
    });
    const [ personInfo, setPersonInfo ] = useState({
        is_adult: index === null ? true : passengers[index].person.is_adult,
        first_name: index === null ? "" : passengers[index].person.first_name,
        last_name: index === null ? "" : passengers[index].person.last_name,
        patronymic: index === null ? "" : passengers[index].person.patronymic,
        gender: index === null ? true : passengers[index].person.gender,
        birthday: index === null ? "" : passengers[index].person.birthday,
        document_type: index === null ? "Паспорт" : passengers[index].person.document_type,
        documentSeries: index === null ? "" : passengers[index].person.documentSeries,
        documentNumber: index === null ? "" : passengers[index].person.documentNumber,
    })

    useEffect(() => {
        if (passengers.length + 1 >= number) {
            setVision(true);
        }
    },[passengers, number])

    const toggleVision = () => {
        setVision(!vision);
    }

    const showList = name => {
        setShow(prevState => (prevState[name] === true ? {...prevState, [name]: false} : {...prevState, [name]: true}));
    }

    const handleChoose = (name, value) => {
        setPersonInfo(prevState => ({...prevState, [name]: value}));
        showList(name);
    }

    const handleChange = evt => {
        const {name, value} = evt.target;
        setPersonInfo(prevState => ({...prevState, [name]: value}));
    }

    const inpitChecking = evt => {
        let text = null;
        let example = null;
        let invalid = null;
        const {name, value} = evt.target;
        if (name === errorText.invalid) {
            if (name === "last_name" || name === "first_name" || name === "patronymic") {
                if (personInfo[name] === "") {
                    if (name === "last_name") {
                        text = "Необходимо ввести данные о фамилии пассажира";
                        invalid = "last_name";
                    }
                    if (name === "first_name") {
                        text = "Необходимо ввести данные об имени пассажира";
                        invalid = "first_name";
                    }
                    if (name === "patronymic") {
                        text = "Необходимо ввести данные об отчестве пассажира";
                        invalid = "patronymic";
                    }
                }
            }
            if (name === "documentSeries") {
                if (!/^[0-9]{4}/.test(value)) {
                    text = "Cерия паспорта указана некорректно";
                    example = "1 2 3 4";
                    invalid = "documentSeries";
                } 
            }
            if (name === "documentNumber") {
                if (personInfo.document_type === "Паспорт") {
                    if (!/^[0-9]{6}/.test(personInfo.documentNumber)) {
                        text = "Номер паспорта указан некорректно";
                        example = "1 2 3 4 5 6";
                        invalid = "documentNumber";
                    }
                } else {
                    if(!/^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][А-Я]{2}[-][0-9]{6}/.test(value)) {
                        text = "Номер свидетельства о рождении указан некорректно";
                        example = "VIII-ЫП-123456";
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
        if (personInfo.birthday === "") {
            text = "Введите дату рождения пассажира";
            invalid = "birthday";
        }
        setErrorText(prevState => ({...prevState, invalid, text}));
    }

    const checkingForm = () => {
        let text = null;
        let example = null;
        let invalid = null;
        if (personInfo.last_name === "") {
            text = "Необходимо ввести данные о фамилии пассажира";
            invalid = "last_name";
        } else if (personInfo.first_name === "") {
            text = "Необходимо ввести данные об имени пассажира";
            invalid = "first_name";
        } else if (personInfo.patronymic === "") {
            text = "Необходимо ввести данные об отчестве пассажира";
            invalid = "patronymic";
        } else if (personInfo.birthday === "") {
            text = "Введите дату рождения пассажира";
            invalid = "birthday";
        } else if (personInfo.document_type === "Паспорт") {
            if (!/^[0-9]{4}/.test(personInfo.documentSeries)) {
                text = "Cерия паспорта указана некорректно";
                example = "1 2 3 4";
                invalid = "documentSeries";
            } else if (!/^[0-9]{6}/.test(personInfo.documentNumber)) {
                text = "Номер паспорта указан некорректно";
                example = "1 2 3 4 5 6";
                invalid = "documentNumber";
            }
        } else if (personInfo.document_type === "Cвидетельства о рождении") {
            if (!/^M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][А-Я]{2}[-][0-9]{6}/.test(personInfo.documentNumber)) {
                text = "Номер свидетельства о рождении указан некорректно";
                example = "VIII-ЫП-123456";
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

    const handleSubmit = evt => {
        evt.preventDefault();
        const check = checkingForm ();
        if (check) {
            setComplete(true);
            dispatch(setPassenger({number, person: {
                is_adult: personInfo.is_adult,
                first_name: personInfo.first_name,
                last_name: personInfo.last_name,
                patronymic: personInfo.patronymic,
                gender: personInfo.gender,
                birthday: personInfo.birthday,
                document_type: personInfo.document_type,
                documentSeries: personInfo.documentSeries,
                documentNumber: personInfo.documentNumber,
            }}))
        }
    }

    return (
        <section className="personInfo">
            <div className="personInfo_header">
                <div className="personInfo_headerBox">
                    <div onClick={toggleVision} className={vision ? "personInfo_openBtnOpened" : "personInfo_openBtnClosed"}></div>
                    <div>Пассажир</div>
                    <div className="personInfo_number">{number}</div>
                </div>
                <div onClick={toggleVision} className={vision ? "personInfo_closeBtn" : "visually-hidden"}></div>
            </div>
            {vision && <form onSubmit={handleSubmit} className="personInfo_form">
                <div className="personInfo_choosing personInfo_isAdult">{personInfo.is_adult === true ? 'Взрослый' : 'Детский'}
                    <div className="personInfo_choosingArrow" onClick={() => showList('is_adult')}></div>
                    {show.is_adult && <ul className="personInfo_list">
                            <li className="personInfo_listItem" onClick={() => handleChoose("is_adult", true)}>Взрослый</li>
                            <li className="personInfo_listItem" onClick={() => handleChoose("is_adult", false)}>Детский</li>
                    </ul>}
                </div>
                <div className="personInfo_formRow personInfo_formRowName">
                    <div className="personInfo_nameBox">
                        <label className="personInfo_label" htmlFor="last_name">Фамилия</label>
                        <input className={errorText.invalid === "last_name" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"} 
                        onChange={handleChange} onBlur={inpitChecking} id="last_name" value={personInfo.last_name} name="last_name" required />
                    </div>
                    <div className="personInfo_nameBox">
                        <label className="personInfo_label" htmlFor="first_name">Имя</label>
                        <input className={errorText.invalid === "first_name" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"}
                        onChange={handleChange} onBlur={inpitChecking} id="first_name" value={personInfo.first_name} name="first_name" required />
                    </div>
                    <div className="personInfo_nameBox">
                        <label className="personInfo_label" htmlFor="patronymic">Отчество</label>
                        <input className={errorText.invalid === "patronymic" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"} 
                        onChange={handleChange} onBlur={inpitChecking} id="patronymic" value={personInfo.patronymic} name="patronymic" required />
                    </div>
                </div>
                <div className="personInfo_formRow">
                    <div>
                        <div className="personInfo_label">Пол</div>
                        <div className="personInfo_chooseGender">
                            <div className={personInfo.gender ? "personInfo_genderItem personInfo_genderItemActive" : "personInfo_genderItem"} 
                            onClick={() => handleChoose("gender", true)}>М</div>
                            <div className={personInfo.gender ? "personInfo_genderItem" : "personInfo_genderItem personInfo_genderItemActive"} 
                            onClick={() => handleChoose("gender", false)}>Ж</div>
                        </div>
                    </div>
                    <div>
                        <div className="personInfo_label">Дата рождения</div>
                        <div>
                            <DatePicker 
                                dateFormat="yyyy-MM-dd"
                                locale="ru" 
                                selected={personInfo.birthday}
                                onChange={(date) => handleChoose("birthday", date)}
                                className={errorText.invalid === "birthday" ? "personInfo_formControl personInfo_formControlInvalid" : "personInfo_formControl"}
                                placeholderText={"ДД/ММ/ГГ"} 
                                onBlur={checkDate}
                            />
                        </div>
                    </div>
                </div>
                <div className="personInfo_formRow">
                    <input className="personInfo_checkbox" type="checkbox" />
                    <div className="personInfo_text">ограниченная подвижность</div>
                </div>
                <div className="personInfo_formRow personInfo_formRowDocs">
                    <div>
                        <div className="personInfo_label">Тип документа</div>
                        <div className="personInfo_choosing personInfo_documentType">{personInfo.document_type}
                            <div className="personInfo_choosingArrow" onClick={() => showList("document_type")}></div>
                            {show.document_type && <ul className="personInfo_list">
                                    <li className="personInfo_listItem" onClick={() => handleChoose("document_type", "Паспорт")}>Паспорт</li>
                                    <li className="personInfo_listItem" onClick={() => handleChoose("document_type", "Свидетельство о рождении")}>Свидетельство о рождении</li>
                            </ul>}
                        </div>
                    </div>
                    {personInfo.document_type === "Паспорт" && <div className="personInfo_docsBox">
                        <label className="personInfo_label" htmlFor="documentSeries">Серия</label>
                        <input className={errorText.invalid === "documentSeries" ? "personInfo_formControl formcontrolPassort personInfo_formControlInvalid" : "personInfo_formControl formcontrolPassort"} 
                        onChange={handleChange} id="documentSeries" value={personInfo.documentSeries} placeholder="_ _ _ _" pattern="[0-9]{4}" maxLength="4" onBlur={inpitChecking} required name="documentSeries" />
                    </div>}
                    <div className="personInfo_docsBox">
                        <label className="personInfo_label" htmlFor="documentNumber">Номер</label>
                        {personInfo.document_type === "Паспорт" && 
                        <input className={errorText.invalid === "documentSeries" ? "personInfo_formControl formcontrolPassort personInfo_formControlInvalid" : "personInfo_formControl formcontrolPassort"} 
                        onChange={handleChange} id="documentNumber" value={personInfo.documentNumber} placeholder="_ _ _ _ _ _" pattern="[0-9]{6}" maxLength="6" name="documentNumber" onBlur={inpitChecking} required />}
                        {personInfo.document_type === "Свидетельство о рождении" && <div className="formcontrolСertificate">
                            <input className={errorText.invalid === "documentNumber" ? "personInfo_formControl formcontrolСertificateInput personInfo_formControlInvalid" : "personInfo_formControl formcontrolСertificateInput"} 
                            onChange={handleChange} id="documentNumber" value={personInfo.documentNumber} name="documentNumber" onBlur={inpitChecking} maxLength="14" required 
                            pattern="M{0,3}(D?C{0,3}|C[DM])(L?X{0,3}|X[LC])(V?I{0,3}|I[VX])[-][А-Я]{2}[-][0-9]{6}" />
                            {personInfo.documentNumber === null && <div className="formcontrolСertificatePlaceholder">12 символов<br></br>_ _ _ _ _ _ _ _ _ _ _ _</div>}
                        </div>}
                    </div>
                </div>
                {errorText.text === null && <div className={complete ? "btnBox personInfo_btnBox personInfo_btnBoxFormComplete" : "btnBox personInfo_btnBox"}>
                    {complete && <div className="personInfo_completeBox">
                        <div className="personInfo_completePic"></div>
                        <div className="personInfo_completeText">Готово</div>
                    </div>}
                    <button className={complete ? "whiteBtn personInfo_completeBtn" : "whiteBtn"} type="submit" onClick={handleSubmit}>Следующий пассажир</button>
                </div>}
                {errorText.text && <div className="personInfo_errorBox">
                    <div className="personInfo_errorPic"></div>
                    <div>
                        <div>{errorText.text}</div>
                        {errorText.example && <div>Пример: 
                            <span className="personInfo_example">{errorText.example}</span>
                        </div>}
                    </div>
                </div>}
            </form>}
        </section>
    )
}

export default PersonInfo;