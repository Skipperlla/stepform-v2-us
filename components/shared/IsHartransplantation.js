import React from "react";
import cl from "clsx";
import {makeStyles} from "@material-ui/core/styles";

// MUI
import Button from "@material-ui/core/Button";

// HOOKS
import {useTranslation} from 'react-i18next';

import prev_arrow from "../../assets/prev_arrow.svg";
import {LOAD_CLASS_NAME, LOAD_DELAY} from "../Form";
import {data} from "../../const";

const useStyles = makeStyles((theme) => ({
    btnPrev: {
        border: 'none',
        background: '#F2F8FC',
        borderRadius: '4px',
        width: 'min-content'
    },
    btnNext: {
        marginTop: '0',
        border: 'none',
        background: 'linear-gradient(91.21deg, #50B0E4 -4.63%, #1D65B6 125.17%);',
        borderRadius: '4px',
        justifySelf: 'self-end'
    }

}));

export default function IsHartransplantation(props) {

    const classes = useStyles();

    const {t} = useTranslation();

    const clickNext = (bool) => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.setHaartransplantation(bool);
            props.addStep(props.step + 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    const clickBackValue = () => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step - 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };


    return (
        <div style={{position: 'relative'}}>
            <div className={"animate__slideInRight"}>
                {(props.showDate) &&
                <div className={"animate__slideInRight wrapper_select__years "}>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.haartransplantationDate === data.howLong['Less than 1 year'] && 'btn_aliceblue__active')}
                        onClick={() => {
                            props.setHaartransplantationDate(data.howLong['Less than 1 year'])
                            clickNext(data['yes'])
                        }}>
                        {t('yearsOfSuffer.param1')}
                    </button>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.haartransplantationDate === data.howLong['1 - 3 years'] && 'btn_aliceblue__active')}
                        onClick={() => {
                            props.setHaartransplantationDate(data.howLong['1 - 3 years'])
                            clickNext(data['yes'])
                        }}>
                        {t('yearsOfSuffer.param2')}
                    </button>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.haartransplantationDate === data.howLong['3 - 5 years'] && 'btn_aliceblue__active')}
                        onClick={() => {
                            props.setHaartransplantationDate(data.howLong['3 - 5 years'])
                            clickNext(data['yes'])
                        }}>
                        {t('yearsOfSuffer.param3')}
                    </button>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.haartransplantationDate === data.howLong['More than 5 years'] && 'btn_aliceblue__active')}
                        onClick={() => {
                            props.setHaartransplantationDate(data.howLong['More than 5 years'])
                            clickNext(data['yes'])
                        }}>{t('yearsOfSuffer.param4')}
                    </button>
                </div>
                }
                {(!props.showDate) && <div className='parental_ill_wrapper'>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.haartransplantation === data['yes'] ? 'btn_aliceblue__active' : "")}
                        onClick={() => {
                            props.setShowDate(true)
                            props.setHaartransplantation(data['yes'])
                        }}>
                        <span>{t('yes')}</span>
                    </button>
                    <button
                        className={cl(`${LOAD_CLASS_NAME}`, 'btn_aliceblue', 'button-hover', props.haartransplantation === data['no'] ? 'btn_aliceblue__active' : "")}
                        onClick={() => {
                            props.setShowDate(false)
                            clickNext(data['no'])
                        }}>
                        <span>{t('no')}</span>
                    </button>
                </div>}
            </div>
            <div className='wrapper_buttons'>
                <div className='wrapper_btn_prev__disable_mob'>
                    <Button className={classes.btnPrev} variant="outlined" onClick={() => {
                        if (props.showDate) {
                            props.setShowDate(false)
                            props.setHaartransplantation('')
                        } else {
                            clickBackValue()
                        }
                    }}>
                        <img src={prev_arrow} alt="prev arrow"/>
                        <span className='btn_prev'>{t('back')}</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
