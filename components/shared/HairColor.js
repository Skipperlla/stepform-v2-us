import React from "react";
import cl from "clsx";

// HOOKS
import {useTranslation} from "react-i18next";

// COMPONENTS
import StepButtons from "../StepButtons";
import {LOAD_CLASS_NAME, LOAD_DELAY} from "../Form";
import {data} from "../../const";


export default function Color(props) {
    const {t} = useTranslation();

    const click = async (e) => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.setColor(e);
            props.addStep(props.step + 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    const clickNextValue = () => {
        props.setLoadStep(true)
        setTimeout(() => {
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
            <div className='select_base__grid'>
                {
                    data['colors'].map(el => {
                        return  <div key={el.value}>
                            <p className='select_base_item__title'>{t(`hairColor.${el.slugForI18}`)}</p>
                            <div
                                className={cl('select_base_item',`${LOAD_CLASS_NAME}`, props.color === el.value && 'select_base__active')}
                                onClick={(e) => click(el.value)}>
                                <img
                                    className="brown select_image image__relative__bottom_18"
                                    src={props.gender === "female" ? el.image_woman :  el.image_man}
                                    alt={el.value}
                                    height="auto"
                                />
                            </div>
                        </div>
                    })
                }
            </div>
            <StepButtons callbackPrev={clickBackValue} callbackNext={clickNextValue} check={props.color}/>
        </div>
    );
}
