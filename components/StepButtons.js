import React from 'react';

//MUI
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

//IMAGES
import next_arrow from '../assets/next_arrow.svg'
import prev_arrow from '../assets/prev_arrow.svg'
import {useTranslation} from "react-i18next";
import cl from "clsx";
import {LOAD_CLASS_NAME} from "./Form";

export default function StepButtons({callbackNext, callbackPrev, check}) {

    const useStyles = makeStyles(() => ({
        btnPrev: {
            border: 'none',
            background: '#F2F8FC',
            borderRadius: '4px',
            width: 'min-content'
        },
        btnNext: {
            border: 'none',
            background: 'linear-gradient(91.21deg, #50B0E4 -4.63%, #1D65B6 125.17%);',
            borderRadius: '4px',
            width: 'min-content',
            justifySelf: 'self-end'
        }
    }));

    const {t} = useTranslation();

    const classes = useStyles();

    return (
        <div className='wrapper_buttons'>
            <div className='wrapper_btn_prev__disable_mob'>
                <Button className={cl(classes.btnPrev, `${LOAD_CLASS_NAME}`)} variant="outlined" onClick={callbackPrev}>
                    <img src={prev_arrow} alt="prev arrow"/>
                    <span className='btn_prev'>{t('back')}</span>
                </Button>
            </div>
            {!check ? (
                ""
            ) : (
                <div className='wrapper_btn_next'>
                    <Button className={cl(classes.btnNext, `${LOAD_CLASS_NAME}__next`)} variant="outlined"
                            onClick={callbackNext}>
                        <span className={cl('btn_next', `${LOAD_CLASS_NAME}__next__span`)}>{t('next')}</span>
                        <img src={next_arrow} alt="next arrow"/>
                    </Button>
                </div>
            )}
        </div>
    );

}
