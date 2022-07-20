import React, {useState} from "react";

// IMAGES
import keine from "../../assets/hair_situation/women/keine.svg";
import leight_hover from "../../assets/hair_situation/women/leight_hover.svg";
import leight from "../../assets/hair_situation/women/leight.svg";
import keine_hover from "../../assets/hair_situation/women/keine_hover.svg";
import leightbismabig from "../../assets/hair_situation/women/leightbismabig.svg";
import leightbismabig_hover from "../../assets/hair_situation/women/leightbismabig_hover.svg";
import mittel from "../../assets/hair_situation/women/mittel.svg";
import mittel_hover from "../../assets/hair_situation/women/mittel_hover.svg";
import mittelBisGrob_hover from "../../assets/hair_situation/women/mittelBisGrob_hover.svg";
import mittelBisGrob from "../../assets/hair_situation/women/mittelBisGrob.svg";
import grob from "../../assets/hair_situation/women/grob.svg";
import grob_hover from "../../assets/hair_situation/women/grob_hover.svg"

// COMPONENTS
import ImageHover from "../imageHover";
import StepButtons from "../StepButtons";

// LIBS
import {useTranslation} from "react-i18next";
import cl from "clsx";
import ToggleConditionHair from "../shared/ToggleConditionHair";
import {LOAD_CLASS_NAME, LOAD_DELAY} from "../Form";
import {data} from "../../const";

export default function InterestedFieldW(props) {

    const {t} = useTranslation();

    const [hover1, setHover1] = useState(false)
    const [hover2, setHover2] = useState(false)
    const [hover3, setHover3] = useState(false)
    const [hover4, setHover4] = useState(false)
    const [hover5, setHover5] = useState(false)
    const [hover6, setHover6] = useState(false)

    const clickNext = (e) => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.setInterestedIn(e);
            props.addStep(props.step + 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    const clickValueBack = () => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step - 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };
    const clickValueNext = () => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step + 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    return (<div style={{position: 'relative'}}>
        <div className='step-block'>
            <ToggleConditionHair
                step={props.step}
                setShowHoverImages={props.setShowHoverImages}
                showHoverImages={props.showHoverImages}
            />
            <div className='select_base__grid'>
                <div>
                    <p className='select_base_item__title'>{t('hairloss.keine')}</p>
                    <div
                        onMouseEnter={() => {
                            setHover1(true)
                        }}
                        onMouseLeave={() => {
                            setHover1(false)
                        }}
                        className={cl('select_base_item', `${LOAD_CLASS_NAME}`, props.interestedIn === data['condition'][0].value && 'select_base__active', (hover1 || props.showHoverImages) ? 'image__align_center' : '')}
                        onClick={(e) => clickNext(data['condition'][0].value)}>
                        <ImageHover
                            check={hover1 | props.showHoverImages}
                            img={keine}
                            imgHover={keine_hover}
                            alt={'No hair loss'}
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t('hairloss.light')}</p>
                    <div
                        onMouseEnter={() => {
                            setHover2(true)
                        }}
                        onMouseLeave={() => {
                            setHover2(false)
                        }}
                        className={cl('select_base_item', `${LOAD_CLASS_NAME}`, props.interestedIn === data['condition'][1].value && 'select_base__active', (hover1 || props.showHoverImages) ? 'image__align_center' : '')}
                        onClick={(e) => clickNext(data['condition'][1].value)}>
                        <ImageHover
                            check={hover2 | props.showHoverImages}
                            img={leight}
                            imgHover={leight_hover}
                            alt={'Receding hairline light'}
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t('hairloss.light_moderate')}</p>
                    <div
                        onMouseEnter={() => {
                            setHover3(true)
                        }}
                        onMouseLeave={() => {
                            setHover3(false)
                        }}
                        className={cl('select_base_item', `${LOAD_CLASS_NAME}`, props.interestedIn === data['condition'][2].value && 'select_base__active', (hover1 || props.showHoverImages) ? 'image__align_center' : '')}
                        onClick={(e) => clickNext(data['condition'][2].value)}>
                        <ImageHover
                            check={hover3 | props.showHoverImages}
                            img={leightbismabig}
                            imgHover={leightbismabig_hover}
                            alt={'Receding hairline + slight tonsure'}
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t('hairloss.middle')}</p>
                    <div
                        onMouseEnter={() => {
                            setHover4(true)
                        }}
                        onMouseLeave={() => {
                            setHover4(false)
                        }}
                        className={cl('select_base_item', `${LOAD_CLASS_NAME}`, props.interestedIn === data['condition'][3].value && 'select_base__active', (hover1 || props.showHoverImages) ? 'image__align_center' : '')}
                        onClick={(e) => clickNext(data['condition'][3].value)}>
                        <ImageHover
                            check={hover4 | props.showHoverImages}
                            img={mittel}
                            imgHover={mittel_hover}
                            alt={'Receding hairline strong + tonsure'}
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t('hairloss.middle_rough')}</p>
                    <div
                        onMouseEnter={() => {
                            setHover5(true)
                        }}
                        onMouseLeave={() => {
                            setHover5(false)
                        }}
                        className={cl('select_base_item', `${LOAD_CLASS_NAME}`, props.interestedIn === data['condition'][4].value && 'select_base__active', (hover1 || props.showHoverImages) ? 'image__align_center' : '')}
                        onClick={(e) => clickNext(data['condition'][4].value)}>
                        <ImageHover
                            check={hover5 | props.showHoverImages}
                            img={mittelBisGrob}
                            imgHover={mittelBisGrob_hover}
                            alt={'Semi bald'}
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t('hairloss.rough')}</p>
                    <div
                        onMouseEnter={() => {
                            setHover6(true)
                        }}
                        onMouseLeave={() => {
                            setHover6(false)
                        }}
                        className={cl('select_base_item', `${LOAD_CLASS_NAME}`, props.interestedIn === data['condition'][5].value && 'select_base__active', (hover1 || props.showHoverImages) ? 'image__align_center' : '')}
                        onClick={(e) => clickNext(data['condition'][5].value)}>
                        <ImageHover
                            check={hover6 | props.showHoverImages}
                            img={grob}
                            imgHover={grob_hover}
                            alt={'Bald'}
                        />
                    </div>
                </div>
            </div>
            <StepButtons callbackPrev={clickValueBack} callbackNext={clickValueNext} check={props.interestedIn}/>
        </div>
    </div>);
}
