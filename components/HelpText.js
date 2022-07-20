import React from "react";

//IMAGES
import doctor from '../assets/doctor.png'

//HOOKS
import Typewriter from "typewriter-effect";
import {useTranslation} from "react-i18next";

export default function HelpText(props) {

    const {t} = useTranslation();

    const DELAY_TYPEWRITER = 25

    let name1 = <Typewriter
        options={
            {
                delay: DELAY_TYPEWRITER
            }
        }
        onInit={(typewriter) => {
            typewriter
                .typeString(t(`helperText.step1`))
                .start();
        }}
    />

    let name2 = <Typewriter
        options={
            {
                delay: DELAY_TYPEWRITER
            }
        }
        onInit={(typewriter) => {
            typewriter
                .typeString(t(`helperText.step2`))
                .start();
        }}
    />

    let name3 = <Typewriter
        options={
            {
                delay: DELAY_TYPEWRITER
            }
        }
        onInit={(typewriter) => {
            typewriter
                .typeString(t(`helperText.step3`))
                .start();
        }}
    />

    let name4 = <Typewriter
        options={
            {
                delay: DELAY_TYPEWRITER
            }
        }
        onInit={(typewriter) => {
            typewriter
                .typeString(t(`helperText.step4`))
                .start();
        }}
    />

    let name5 = <Typewriter
        options={
            {
                delay: DELAY_TYPEWRITER
            }
        }
        onInit={(typewriter) => {
            typewriter
                .typeString(t(`helperText.step5`))
                .start();
        }}
    />

    let name6 = <Typewriter
        options={
            {
                delay: DELAY_TYPEWRITER
            }
        }
        onInit={(typewriter) => {
            typewriter
                .typeString(t(`helperText.step6`))
                .start();
        }}
    />

    let name7 = <Typewriter
        options={
            {
                delay: DELAY_TYPEWRITER
            }
        }
        onInit={(typewriter) => {
            typewriter
                .typeString(t(`helperText.step7`))
                .start();
        }}
    />


    let name8 = <Typewriter
        options={
            {
                delay: DELAY_TYPEWRITER
            }
        }
        onInit={(typewriter) => {
            typewriter
                .typeString(t(`helperText.step8`))
                .start();
        }}
    />

    return (
        <section className={`wrapper_help ${props.step ===  0 ? 'long' : ""}`}>
            <div className='help-block'>
                <div className='help-input'>
                    <div className='help-input__title'>
                        {props.step === 0 && name1}
                        {props.step === 1 && name2}
                        {props.step === 2 && name3}
                        {props.step === 3 && name4}
                        {props.step === 4 && name5}
                        {props.step === 5 && name6}
                        {props.step === 6 && name7}
                        {props.step === 7 && name8}
                    </div>
                </div>
                <div className='wrapper_name_block'>
                    <img src={doctor} alt="doctor"/>
                    <div className='help-input_name'>
                        <p className='help-input_name_title'>Dr. Levent Acar</p>
                        <p className='help-input_name_subtitle'>{t('surgeonTransplants')} </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
