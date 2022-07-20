import React from "react";

// TRANSLATE
import {useTranslation} from 'react-i18next';
import {useMediaQuery} from "../../hooks/useMediaQuery";

//COMPONENTS

export default function ToggleConditionHair(props) {

    const {t} = useTranslation();

    const tablet_portrait = useMediaQuery('(max-width: 768px)')

    return (
        <>
            {props.step === 1 && tablet_portrait &&
            <div className='wrapper_toggle_images'>
                <p className='toggle_images__title'>{t('frontView')}</p>
                <div onChange={e => props.setShowHoverImages(!props.showHoverImages)}>
                    <input
                        type="checkbox"
                        id="switch"/>
                    <label htmlFor="switch"/>
                </div>
                <p className='toggle_images__title'>{t('topView')}</p>
            </div>
            }
        </>
    );
}
