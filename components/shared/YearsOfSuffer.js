import React from "react";
import cl from "clsx";

//TRANSLATE
import {useTranslation} from "react-i18next";

//COMPONENTS
import StepButtons from "../StepButtons";
import {LOAD_CLASS_NAME, LOAD_DELAY} from "../Form";
import {data} from "../../const";

export default function YearsOfSuffer(props) {

    const {t} = useTranslation();

    const clickNext = async (e) => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step + 1);
            props.setYears(e);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    const onClickNext = async () => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step + 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    const onClickBack = async () => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step - 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    return (
        <>
            <div>
                <div className={"animate__slideInRight wrapper_select__years"}>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.years === data.howLong['Less than 1 year'] && 'btn_aliceblue__active')}
                        onClick={() => {
                            clickNext(data.howLong['Less than 1 year'])
                        }}>
                        {t('yearsOfSuffer.param1')}
                    </button>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.years === data.howLong['1 - 3 years'] && 'btn_aliceblue__active')}
                        onClick={() => {
                            clickNext(data.howLong['1 - 3 years'])
                        }}>
                        {t('yearsOfSuffer.param2')}
                    </button>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.years === data.howLong['3 - 5 years'] && 'btn_aliceblue__active')}
                        onClick={() => {
                            clickNext(data.howLong['3 - 5 years'])
                        }}>
                        {t('yearsOfSuffer.param3')}
                    </button>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.years === data.howLong['More than 5 years'] && 'btn_aliceblue__active')}
                        onClick={() => {
                            clickNext(data.howLong['More than 5 years'])
                        }}>{t('yearsOfSuffer.param4')}
                    </button>
                </div>
            </div>
            <StepButtons callbackPrev={onClickBack} callbackNext={onClickNext} check={props.years}/>
        </>
    );
}
