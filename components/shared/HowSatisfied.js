import React from "react";
import cl from "clsx";

// TRANSLATE
import {useTranslation} from "react-i18next";

// COMPONENTS
import StepButtons from "../StepButtons";

// IMAGES
import sad from '../../assets/satisfaction/Sad.png'
import unamused from '../../assets/satisfaction/Unamused.png'
import speechless from '../../assets/satisfaction/Speechless.png'
import happy from '../../assets/satisfaction/Smile.png'
import happyEyes from '../../assets/satisfaction/HappyEyes.png'
import {LOAD_CLASS_NAME, LOAD_DELAY} from "../Form";
import {data} from "../../const";

export default function Satisfied(props) {

    if(props.haartransplantation === 'no'){
        props.setHaartransplantationDate(null)
    }

    const {t} = useTranslation();

    const click = (e) => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step + 1);
            props.setSatisfied(e);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    const onClickNext = () => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step + 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };
    const onClickBack = () => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.addStep(props.step - 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    return (
        <>
            <div className='select_howsatisfied__grid'>
                <div>
                    <p className='select_base_item__title'>{t("label.one")}</p>
                    <div
                        className={cl(`${LOAD_CLASS_NAME}`,'select_base_item ', props.satisfied === data.howAreYou['Very sad'] && 'select_base__active')}
                        onClick={(e) => click(data.howAreYou['Very sad'])}>
                        <img
                            className="black select_image"
                            src={sad}
                            alt="Very sad"
                            height="auto"
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t("label.two")}</p>
                    <div
                        className={cl(`${LOAD_CLASS_NAME}`,'select_base_item', props.satisfied === data.howAreYou['Sad'] && 'select_base__active')}
                        onClick={(e) => click(data.howAreYou['Sad'])}>
                        <img
                            className="black select_image"
                            src={unamused}
                            alt="Sad "
                            height="auto"
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t("label.three")}</p>
                    <div
                        className={cl(`${LOAD_CLASS_NAME}`,'select_base_item', props.satisfied === data.howAreYou['Normal'] && 'select_base__active')}
                        onClick={(e) => click(data.howAreYou['Normal'])}>
                        <img
                            className="black select_image"
                            src={speechless}
                            alt="speechless "
                            height="auto"
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t("label.four")}</p>
                    <div
                        className={cl(`${LOAD_CLASS_NAME}`,'select_base_item', props.satisfied === data.howAreYou['Happy'] && 'select_base__active')}
                        onClick={(e) => click(data.howAreYou['Happy'] )}>
                        <img
                            className="black select_image"
                            src={happy}
                            alt="happy "
                            height="auto"
                        />
                    </div>
                </div>
                <div>
                    <p className='select_base_item__title'>{t("label.five")}</p>
                    <div
                        className={cl(`${LOAD_CLASS_NAME}`,'select_base_item', props.satisfied === data.howAreYou['Very happy'] && 'select_base__active')}
                        onClick={(e) => click(data.howAreYou['Very happy'] )}>
                        <img
                            className="black select_image"
                            src={happyEyes}
                            alt="Very happy"
                            height="auto"
                        />
                    </div>
                </div>
            </div>
            <StepButtons callbackPrev={onClickBack} callbackNext={onClickNext}
                         check={props.satisfied}/>
        </>
    );
}
