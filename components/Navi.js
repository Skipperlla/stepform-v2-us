import React from "react";

//IMAGES
import logo from "../assets/logo.svg";
import prev_arrow from "../assets/prev_arrow.svg";
import {LOAD_DELAY} from "./Form";

export default function Navi(props) {

    const onClickBack = () => {
        props.setLoadStep(true)
        setTimeout(() => {
            props.prevStep(props.step - 1)
            props.setLoadStep(false)
        }, LOAD_DELAY)
    };

    return (
        <header className='header'>
            {props.step !== 0 &&
            <div
                onClick={() => {
                    if (props.step === 5) {
                        props.setHaartransplantation('no')
                    }
                    if(props.step === 5 && props.showDate){
                        props.setShowDate(false)
                    } else{
                        onClickBack()
                    }
                }}
                className='wrapper_mob_prev'
            >
                <img src={prev_arrow} alt="prev arrow"/>
            </div>
            }
            <img className='logo' src={logo} alt="logo"/>
        </header>
    );
}
