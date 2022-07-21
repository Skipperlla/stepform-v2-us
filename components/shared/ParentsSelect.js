import React from "react";
import cl from "clsx";

// TRANSLATE
import { useTranslation } from "react-i18next";

//COMPONENTS
import StepButtons from "../StepButtons";
import { LOAD_CLASS_NAME, LOAD_DELAY } from "../Form";
import { data } from "../../const";

export default function ParentsSelect(props) {
  const { t } = useTranslation();

  const clickNext = (bool) => {
    props.setLoadStep(true);
    setTimeout(() => {
      props.addStep(props.step + 1);
      props.setParentalIll(bool);
      props.setLoadStep(false);
    }, LOAD_DELAY);
  };

  const clickBackValue = () => {
    props.setLoadStep(true);
    setTimeout(() => {
      props.addStep(props.step - 1);
      props.setLoadStep(false);
    }, LOAD_DELAY);
  };

  const clickNextValue = () => {
    props.setLoadStep(true);
    setTimeout(() => {
      props.addStep(props.step + 1);
      props.setLoadStep(false);
    }, LOAD_DELAY);
  };

  return (
    <>
      <div className={"animate__slideInRight"}>
        <div className="parental_ill_wrapper">
          <button
            className={cl(
              `${LOAD_CLASS_NAME}`,
              "btn_aliceblue",
              "button-hover",
              props.parentalIll === data["yes"] ? "btn_aliceblue__active" : ""
            )}
            onClick={() => {
              clickNext(data["yes"]);
            }}
          >
            <span>{t("yes")}</span>
          </button>
          <button
            className={cl(
              `${LOAD_CLASS_NAME}`,
              "btn_aliceblue",
              "button-hover",
              props.parentalIll === data["no"] ? "btn_aliceblue__active" : ""
            )}
            onClick={() => {
              clickNext(data["no"]);
            }}
          >
            <span>{t("no")}</span>
          </button>
        </div>
      </div>
      <StepButtons
        callbackPrev={clickBackValue}
        callbackNext={clickNextValue}
        check={props.parentalIll}
      />
    </>
  );
}
