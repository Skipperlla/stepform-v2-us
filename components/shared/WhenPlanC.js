import React from "react";
import { useTranslation } from "react-i18next";
import StepButtons from "../StepButtons";
import cl from "clsx";
import { LOAD_CLASS_NAME, LOAD_DELAY } from "../Form";
import { data } from "../../const";

export default function WhenPlanC(props) {
  const { t } = useTranslation();
  const clickNext = async (e) => {
    props.setLoadStep(true);
    setTimeout(() => {
      props.setWhenPlan(e);
      props.addStep(props.step + 1);
      props.setLoadStep(false);
    }, LOAD_DELAY);
  };

  const onClickNext = async () => {
    props.setLoadStep(true);
    setTimeout(() => {
      props.addStep(props.step + 1);
      props.setLoadStep(false);
    }, LOAD_DELAY);
  };

  const onClickBack = async () => {
    props.setLoadStep(true);
    setTimeout(() => {
      props.addStep(props.step - 1);
      props.setLoadStep(false);
    }, LOAD_DELAY);
  };

  return (
    <>
      <div>
        <div className={"animate__slideInRight wrapper_select__years"}>
          <button
            className={cl(
              `${LOAD_CLASS_NAME}`,
              "btn_aliceblue",
              "button-hover",
              props.whenPlan === data.whenPLan["As soon as possible"] &&
                "btn_aliceblue__active"
            )}
            onClick={() => {
              clickNext(data.whenPLan["As soon as possible"]);
            }}
          >
            {t("whenPlanC.param1")}
          </button>
          <button
            className={cl(
              `${LOAD_CLASS_NAME}`,
              "btn_aliceblue",
              "button-hover",
              props.whenPlan === data.whenPLan["In 3 months"] &&
                "btn_aliceblue__active"
            )}
            onClick={() => {
              clickNext(data.whenPLan["In 3 months"]);
            }}
          >
            {t("whenPlanC.param2")}
          </button>
          <button
            className={cl(
              `${LOAD_CLASS_NAME}`,
              "btn_aliceblue",
              "button-hover",
              props.whenPlan === data.whenPLan["In 1 year"] &&
                "btn_aliceblue__active"
            )}
            onClick={() => {
              clickNext(data.whenPLan["In 1 year"]);
            }}
          >
            {t("whenPlanC.param3")}
          </button>
          <button
            className={cl(
              `${LOAD_CLASS_NAME}`,
              "btn_aliceblue",
              "button-hover",
              props.whenPlan === data.whenPLan["Not yet scheduled"] &&
                "btn_aliceblue__active"
            )}
            onClick={() => {
              clickNext(data.whenPLan["Not yet scheduled"]);
            }}
          >
            {t("whenPlanC.param4")}
          </button>
        </div>
      </div>
      <StepButtons
        callbackPrev={onClickBack}
        callbackNext={onClickNext}
        check={props.whenPlan}
      />
    </>
  );
}
