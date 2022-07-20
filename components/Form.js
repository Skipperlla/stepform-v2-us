import React, { useState } from "react";
import "animate.css";

// COMPONENTS
import Gender from "./shared/Gender";
import InterestedFieldM from "./male/HairLossExplaination";
import InterestedFieldW from "./female/HairLossExplaination";
import HairColor from "./shared/HairColor";
import YearsOfSuffer from "./shared/YearsOfSuffer";
import HowSatisfied from "./shared/HowSatisfied";
import PersonalFields from "./shared/PersonalFields";
import ParentsSelect from "./shared/ParentsSelect";
import IsHartransplantation from "./shared/IsHartransplantation";
import WhenPlan from "./shared/WhenPlanC";
import HelpText from "./HelpText";
import Navi from "./Navi";

// HOOKS
import { useTranslation } from "react-i18next";

// MUI
import { MobileStepper } from "@material-ui/core";
import { CircularProgress } from "@mui/material";
import { data } from "../const";

export const LOAD_DELAY = 500;
export const LOAD_CLASS_NAME = "flash__animate";

export default function Form() {
  const { t } = useTranslation();

  const COUNT_STEPS = 9;

  const [step, setActiveStep] = React.useState(0);

  const [succesForm, setSuccesForm] = React.useState(false);
  const [loadStep, setLoadStep] = React.useState(false);
  const [gender, setGender] = React.useState(0);
  const [color, setColor] = React.useState(0);
  const [interestedIn, setInterestedIn] = React.useState(0);
  const [parentalIll, setParentalIll] = React.useState(0);
  const [years, setYears] = React.useState("");
  const [satisfied, setSatisfied] = React.useState(0);
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [number, setNumber] = React.useState("");
  const [whenPlan, setWhenPlan] = React.useState("");
  const [showHoverImages, setShowHoverImages] = React.useState(false);

  const [showDate, setShowDate] = useState(false);

  const [haartransplantation, setHaartransplantation] = React.useState("");
  const [haartransplantationDate, setHaartransplantationDate] =
    React.useState(null);

  const state = {
    gender,
    years,
    interestedIn,
    parentalIll,
    haartransplantation,
    haartransplantationDate,
    color,
    satisfied,
    whenPlan,
    email,
    name,
    number,
  };
  return (
    <div className="container-main">
      <Navi
        setLoadStep={setLoadStep}
        showDate={showDate}
        setShowDate={setShowDate}
        setHaartransplantation={setHaartransplantation}
        step={step}
        prevStep={setActiveStep}
      />
      <main className={"containerMain"}>
        {loadStep && (
          <div className="loader_between_step">
            <CircularProgress style={{ color: "#3E95D4" }} />
          </div>
        )}
        {succesForm ? (
          <p className="form-title-step"> {t("finished")} </p>
        ) : (
          <p className="form-title-step">
            {" "}
            {step === 8 ? t("finalStep") : t("step")} {step !== 8 && step + 1}
          </p>
        )}
        {step === 0 && <h1 className="step-title">{t("gender")}</h1>}
        {step === 1 && gender === data["gender"][1].value && (
          <h1 className="step-title">{t("hair_loss")}</h1>
        )}
        {step === 1 && gender === data["gender"][0].value && (
          <h1 className="step-title">{t("hair_loss")}</h1>
        )}
        {step === 2 && <h1 className="step-title">{t("hair_color")}</h1>}
        {step === 3 && <h1 className="step-title">{t("hair_suffer")}</h1>}
        {step === 4 && (
          <>
            <h1 className="step-title">{t("since_when")}</h1>
          </>
        )}
        {step === 5 && haartransplantation !== data["yes"] && (
          <>
            <h1 className="step-title">{t("hair_transplant")}</h1>
          </>
        )}
        {step === 5 && haartransplantation === data["yes"] && (
          <>
            <h1 className="step-title">{t("hair_transplant_next_step")}</h1>
          </>
        )}
        {step === 6 && (
          <>
            <h1 className="step-title">{t("satisfied")}</h1>
          </>
        )}
        {step === 7 && <h1 className="step-title">{t("planing")}</h1>}
        {step === 8 && (
          <>
            {succesForm ? (
              <>
                <h1 style={{ marginTop: "70px" }} className="step-title">
                  {t("regards")}
                </h1>
                <h2 className="step-subtitle">{t("upload")}</h2>
              </>
            ) : (
              <>
                <h1 className="step-title">{t("done")}</h1>
                <h2 className="step-subtitle">{t("results")}</h2>
              </>
            )}
          </>
        )}
        {step !== 8 && (
          <div className="indicator-wrapper">
            <MobileStepper
              variant="progress"
              steps={COUNT_STEPS}
              position="static"
              activeStep={step}
            />
          </div>
        )}
        {step === 0 && (
          <div className={"step-block"}>
            <Gender
              setLoadStep={setLoadStep}
              step={step}
              addStep={setActiveStep}
              gender={gender}
              setGender={setGender}
            />
          </div>
        )}
        {step === 1 && gender === data["gender"][1].value && (
          <div className={"step-block"}>
            <div>
              <InterestedFieldW
                setLoadStep={setLoadStep}
                setShowHoverImages={setShowHoverImages}
                showHoverImages={showHoverImages}
                step={step}
                addStep={setActiveStep}
                interestedIn={interestedIn}
                setInterestedIn={setInterestedIn}
              />
            </div>
          </div>
        )}
        {step === 1 && gender === data["gender"][0].value && (
          <div className={"step-block"}>
            <div>
              <InterestedFieldM
                setLoadStep={setLoadStep}
                setShowHoverImages={setShowHoverImages}
                showHoverImages={showHoverImages}
                step={step}
                addStep={setActiveStep}
                interestedIn={interestedIn}
                setInterestedIn={setInterestedIn}
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className={"step-block"}>
            <div>
              <HairColor
                setLoadStep={setLoadStep}
                gender={gender}
                step={step}
                addStep={setActiveStep}
                color={color}
                setColor={setColor}
              />
            </div>
          </div>
        )}
        {step === 3 && (
          <>
            <ParentsSelect
              setLoadStep={setLoadStep}
              step={step}
              addStep={setActiveStep}
              parentalIll={parentalIll}
              setParentalIll={setParentalIll}
            />
          </>
        )}
        {step === 4 && (
          <>
            <YearsOfSuffer
              setLoadStep={setLoadStep}
              step={step}
              addStep={setActiveStep}
              years={years}
              setYears={setYears}
            />
          </>
        )}
        {step === 5 && (
          <>
            <IsHartransplantation
              setLoadStep={setLoadStep}
              step={step}
              addStep={setActiveStep}
              haartransplantation={haartransplantation}
              showDate={showDate}
              setShowDate={setShowDate}
              haartransplantationDate={haartransplantationDate}
              setHaartransplantation={setHaartransplantation}
              setHaartransplantationDate={setHaartransplantationDate}
            />
          </>
        )}
        {step === 6 && (
          <>
            <div className={"step-block"}>
              <div>
                <HowSatisfied
                  setLoadStep={setLoadStep}
                  satisfied={satisfied}
                  setSatisfied={setSatisfied}
                  step={step}
                  haartransplantation={haartransplantation}
                  setHaartransplantationDate={setHaartransplantationDate}
                  addStep={setActiveStep}
                />
              </div>
            </div>
          </>
        )}
        {step === 7 && (
          <>
            <>
              <WhenPlan
                setLoadStep={setLoadStep}
                step={step}
                addStep={setActiveStep}
                whenPlan={whenPlan}
                setWhenPlan={setWhenPlan}
              />
            </>
          </>
        )}
        {step === 8 && (
          <>
            <PersonalFields
              state={state}
              step={step}
              addStep={setActiveStep}
              email={email}
              setEmail={setEmail}
              name={name}
              setName={setName}
              lastName={lastName}
              setLastName={setLastName}
              setNumber={setNumber}
              number={number}
              setSuccesForm={setSuccesForm}
              succesForm={succesForm}
            />
          </>
        )}
      </main>
      {step !== 8 && <HelpText step={step} />}
    </div>
  );
}
