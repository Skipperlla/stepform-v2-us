import React from "react";
import cl from "clsx";

//TRANSLATE
import {useTranslation} from 'react-i18next';
import {LOAD_CLASS_NAME, LOAD_DELAY} from "../Form";
import {data} from "../../const";

export default function Form(props) {

    const {t} = useTranslation();

    const click = async (value) => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.setGender(value);
            props.addStep(props.step + 1);
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    return (
        <>
            <div className='select_gender__grid'>
                {data['gender'].map(el => {
                    return  <div key={el.value}>
                        <p className='select_gender_item_title'>{t(`genderSelect.genderName.${el.slugForI18}`)}</p>
                        <div
                            className={cl(`${LOAD_CLASS_NAME}` ,'select_gender_item'  , props.gender === el.value && 'select_gender_item__active')}
                            onClick={(e) => click(`${el.value}`)}>
                            <img
                                src={el.img}
                                className={`select_image ${el.value}`}
                                alt={el.value}
                                height="auto"
                            />
                        </div>
                    </div>
                })}
              {/*  <div>
                    <p className='select_gender_item_title'>{t('genderSelect.genderName.male')}</p>
                    <div
                        className={cl(`${LOAD_CLASS_NAME}` ,'select_gender_item'  , props.gender === 'male' && 'select_gender_item__active')}
                        onClick={(e) => click('male')}>
                        <img
                            src={male}
                            className="male select_image"
                            alt="male"
                            height="auto"
                        />
                    </div>
                </div>
                <div>
                    <p className='select_gender_item_title'>{t('genderSelect.genderName.female')}</p>
                    <div
                        className={cl('select_gender_item', `${LOAD_CLASS_NAME}`, props.gender === 'female' && 'select_gender_item__active')}
                        onClick={(e) => click('female')}>
                        <img
                            src={female}
                            className="female select_image "
                            alt="female"
                            height="auto"
                        />
                    </div>
                </div>*/}
            </div>
        </>
    );
}
