import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { CircularProgress } from "@mui/material";

// VALID LIBS
import PhoneInput from "react-phone-input-2";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik, useFormik, Form } from "formik";

// IMAGES
import next_arrow from "../../assets/next_arrow.svg";
import check_circle from "../../assets/final-step/check_circle.svg";
import lock from "../../assets/final-step/lock.svg";
import search from "../../assets/final-step/search.svg";

//AXIOS
import axios from "axios";
const baseURL = "https://stepform.herokuapp.com/api/v1";
import { countries, data } from "../../const";

export default function PersonalFields(props) {
  const { t } = useTranslation();

  const personalDateSchema = Yup.object().shape({
    phone: Yup.string().required(t("form.mobile_warning")),
    name: Yup.string().required(t("form.firstName_warning")),
    lastName: Yup.string().required(t("form.lastName_warning")),
    country: Yup.mixed().required(t("form.country_warning")),
    email: Yup.string()
      .email(t("form.email_not_correct"))
      .required(t("form.email_warning")),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      phone: "",
      email: "",
      country: countries[1].label,
    },
  });

  const useStyles = makeStyles((theme) => ({
    btn: {
      border: "none",
      height: "64px",
      background: "linear-gradient(91.21deg, #50B0E4 -4.63%, #1D65B6 125.17%);",
      borderRadius: "4px",
      justifySelf: "self-end",
    },
    btn_upload: {
      marginTop: "70px",
      maxWidth: "425px",
      border: "none",
      height: "64px",
      background: "linear-gradient(91.21deg, #50B0E4 -4.63%, #1D65B6 125.17%);",
      borderRadius: "4px",
      justifySelf: "self-end",
    },
  }));
  const classes = useStyles();

  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [load, setLoad] = useState(false);
  const [images, setImages] = useState([]);
  const uploadPhotos = `https://cosmedica.com/thank-you-request/?full_name=${
    name + "" + lastName
  }&mail=${email}&phone=${phone}`;
  const hairDirections = [
    {
      direction: "Front",
      path: "front",
      name: "Front",
    },
    {
      direction: "Back",
      path: "back",
      name: "Back_Side",
    },
    {
      direction: "Crown",
      path: "crown",
      name: "Front_Down",
    },
    {
      direction: "Left Side",
      path: "otherSide",
      name: "Left_Side",
    },

    {
      direction: "Right Side",
      path: "side",
      name: "Right_Side",
    },
  ];
  const [localCountry, setLocalCountry] = useState("");
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("geolocation"));
    setLocalCountry(data?.country_code);
    if (props?.succesForm) {
      if (data?.country_code === "US" || data?.country_code === "USA") {
        setTimeout(() => {
          window.location.replace(
            "https://cosmedica.com/hair-transplant-in-turkey-lp-usa"
          );
        }, 1500);
      } else if (data?.country_code === "GB" || data?.country_code === "UK") {
        setTimeout(() => {
          window.location.replace(
            "https://cosmedica.com/hair-transplant-in-turkey-lp-uk"
          );
        }, 1500);
      } else if (data?.country_code === "CA") {
        setTimeout(() => {
          window.location.replace(
            "https://cosmedica.com/hair-transplant-in-turkey-lp-ca"
          );
        }, 1500);
      }
    }
  }, [props.succesForm]);
  useEffect(() => {}, []);
  return (
    <>
      {props.succesForm ? (
        <Link href={uploadPhotos} target="blank"></Link>
      ) : (
        <div className={"animate__slideInRight wrapper_form"}>
          {load && (
            <div className="wrapper_load">
              <CircularProgress style={{ color: "#3E95D4" }} />
            </div>
          )}
          <Formik
            validationSchema={personalDateSchema}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              setPhone(values.phone);
              setEmail(values.email);
              setName(values.name);
              setLastName(values.lastName);
              delete props.state.email;
              delete props.state.name;
              delete props.state.number;
              // ! New Axios
              setLoad(true);

              await axios
                .post(baseURL, {
                  data: {
                    jsonData: [
                      {
                        ...props.state,
                        ...values,
                        lead_source:
                          localCountry === "US" || localCountry === "USA"
                            ? "LP USA"
                            : localCountry === "GB" || localCountry === "UK"
                            ? "LP UK"
                            : localCountry === "CA"
                            ? "LP CA"
                            : "none",
                      },
                    ],
                  },
                })
                .then(async (data) => {
                  if (images.length) {
                    await images?.map(async (item) => {
                      const formData = new FormData();
                      formData.append("file", item.file);
                      formData.append("ID", data.data.ID);
                      formData.append("direction", item.name);
                      await axios
                        .post(baseURL + "/sendPhoto", formData, {
                          headers: { "Content-Type": "multipart/form-data" },
                        })
                        .then((res) => {
                          props.setSuccesForm(true);
                          setLoad(false);
                        })
                        .catch((err) => {});
                    });
                  } else {
                    props.setSuccesForm(true);
                    setLoad(false);
                  }
                })
                .catch((err) => {
                  console.log(err.response);
                });
              // ! New Axios

              // newObject.name = values.name;
              // newObject.lastName = values.lastName;
              // newObject.email = values.email;
              // newObject.phone = values.phone;
              // newObject.country = values.country;
              // newObject.body =
              //   `<p>Gender - ${props.state.gender}</p>` +
              //   `<p>First Name - ${values.name}</p>` +
              //   `<p>Last Name - ${values.lastName}</p>` +
              //   `<p>Email - ${values.email}</p>` +
              //   `<p>Phone - ${values.phone}</p>` +
              //   `<p>Beschreiben sie Ihren Haarausfall - ${props.state.interestedIn}</p>` +
              //   `<p>Welche Haarfarbe haben Sie? - ${props.state.color}</p>` +
              //   `<p>Leidet einer Ihrer Eltern an Haarausfall? - ${props.state.parentalIll}</p>` +
              //   `<p>Seit wann leiden Sie unter Haarausfall? - ${props.state.years}</p>` +
              //   `<p>Hatten sie schonmal eine Haartransplanation? - ${
              //     props.haartransplantation === "yes"
              //       ? props.state.haartransplantationDate
              //           .toLocaleString()
              //           .split(" ")[0]
              //           .replace(",", "")
              //       : "No"
              //   }</p>` +
              //   `<p>Wie zufrieden sind Sie? - ${props.state.satisfied}</p>` +
              //   `<p>Wann planen Sie eine Haartransplantation? - ${props.state.whenPlan}</p>`;

              // await axios
              //   .post("api/mailer", {
              //     gender: props.state.gender,
              //     email: newObject.email,
              //     lastName: newObject.lastName,
              //     formBody: newObject.body,
              //   })
              //   .then((res) => {
              //     console.log("resMailler", res.data);
              //     axios
              //       .post("api/cosmedica", {
              //         Geschlecht: props.state.gender,
              //         Last_Name: newObject.lastName,
              //         First_Name: newObject.name,
              //         Email: newObject.email,
              //         Status_Haarausfall: props.state.interestedIn,
              //         Haarfarbe_api: props.state.color,
              //         Status_Leiden: "Nope",
              //         Zufriedenheit: props.state.satisfied,
              //         Haarausfall_Eltern: props.state.parentalIll,
              //         Haarausfall_Zeit: props.state.years,
              //         HT_gehabt: props.state.years,
              //         HT_gehabt_Datum: `${
              //           props.state.haartransplantation === data["yes"]
              //             ? props.state.haartransplantationDate
              //             : ""
              //         }`,
              //         HT_Planung: props.state.whenPlan,
              //         country: values.country,
              //       })
              //       .then((e) => {
              //         console.log("cosmedica", e.data);

              //       });
              //   });
            }}
            initialValues={formik.initialValues}
          >
            {({
              isSubmitting,
              setFieldValue,
              values,
              errors,
              touched,
              handleSubmit,
              submitForm,
            }) => (
              <Form className={"wrapper_form__grid"}>
                <div className="wrapper_input__form flexInputForm">
                  <div className="inputMaxWidth">
                    <p className="input__form_title">{t("form.firstName")}</p>
                    <Field name="name">
                      {({ field }) => (
                        <input
                          required
                          {...field}
                          type="text"
                          placeholder={t("form.firstName")}
                          className={
                            formik.errors.name && formik.touched.name
                              ? "component-error-text text-input"
                              : "text-input"
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="component-error-text"
                    />
                  </div>
                </div>
                <div className="wrapper_input__form flexInputForm">
                  <div className="inputMaxWidth">
                    <p className="input__form_title">{t("form.lastName")}</p>
                    <Field name="lastName">
                      {({ field }) => (
                        <input
                          required
                          {...field}
                          placeholder={t("form.lastName")}
                          type="text"
                          className={
                            formik.errors.lastName && formik.touched.lastName
                              ? "component-error-text text-input"
                              : "text-input"
                          }
                        />
                      )}
                    </Field>

                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="component-error-text"
                    />
                  </div>
                </div>
                <div className="wrapper_input__form flexInputForm">
                  <div className="inputMaxWidth">
                    <p className="input__form_title">{t("form.email")}</p>
                    <Field name="email">
                      {({ field }) => (
                        <input
                          required
                          {...field}
                          type="text"
                          placeholder="mail@example.com"
                          className={
                            formik.errors.email && formik.touched.email
                              ? "component-error-text text-input"
                              : "text-input"
                          }
                        />
                      )}
                    </Field>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="component-error-text"
                    />
                  </div>
                </div>
                <div className="flexInputForm">
                  <div className="inputMaxWidth">
                    <p className="input__form_title">{t("form.mobile")}</p>

                    <PhoneInput
                      containerClass={"wrapper_input__form"}
                      name="phone"
                      country={localCountry.toLowerCase()}
                      value={values.phone}
                      onChange={(e) => {
                        setFieldValue("phone", e);
                      }}
                    />
                    <ErrorMessage
                      name="phone"
                      component="div"
                      className="component-error-text"
                    />
                  </div>
                </div>
                <div className="wrapper_input__form flexInputForm">
                  <div className="inputMaxWidth">
                    <p className="input__form_title">{t("form.country")}</p>
                    <Field required name="country">
                      {(field) => (
                        <select
                          {...field}
                          className="select_input__form"
                          name="country"
                          onChange={(value) => {
                            setFieldValue("country", value.target.value);
                          }}
                        >
                          {countries.map((el) => {
                            return (
                              <option key={el.code} value={el.label}>
                                {el.label}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </Field>

                    <ErrorMessage
                      name="country"
                      component="div"
                      className="component-error-text"
                    />
                  </div>
                </div>
                <div
                  className="hairDirection"
                  // style={{
                  //   display: "flex",
                  // }}
                >
                  {hairDirections?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          marginLeft: "1.25rem",
                          marginRight: "1.25rem",
                          borderRadius: "0.75rem",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexDirection: "column",
                          position: "relative",
                        }}
                      >
                        <div
                          style={{
                            position: "relative",
                            cursor: "pointer",
                            width: "75%",
                          }}
                        >
                          <div
                            style={{
                              zIndex: "10",
                              width: "100%",
                              height: "100%",
                              position: "absolute",
                              top: "0",
                              left: "0",
                              borderRadius: "0.75rem",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#00000080",
                            }}
                          >
                            <FontAwesomeIcon
                              icon="upload"
                              style={{
                                color: "#fff",
                                fontSize: "2.25rem",
                                lineHeight: "2.5rem",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            <img
                              src={`/hair_directions/${item.path}.jpg`}
                              style={{
                                borderRadius: "0.75rem",
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </div>
                          <input
                            type="file"
                            style={{
                              cursor: "pointer",
                              position: "absolute",
                              top: "0",
                              bottom: "0",
                              margin: "0",
                              padding: "0",
                              width: "100%",
                              height: "100%",
                              zIndex: "20",
                              opacity: "0",
                            }}
                            name={item.name}
                            onChange={async (e) => {
                              setImages((prev) => [
                                ...prev,
                                { file: e.target.files[0], name: item.name },
                              ]);
                              // setImages({
                              //   ...images,
                              //   [item.name]: e.target.files[0],
                              // });
                            }}
                          />
                        </div>

                        <span
                          style={{
                            marginTop: "0.5rem",
                            fontWeight: "600",
                          }}
                        >
                          {item.direction}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flexInputForm">
                  <Button
                    fullWidth
                    className={`${classes.btn} inputMaxWidth`}
                    color="default"
                    disabled={load}
                    variant="outlined"
                    onClick={() => {
                      submitForm();
                    }}
                  >
                    <span className="btn_next">{t("sendFormBtn")}</span>
                    <img src={next_arrow} alt="next arrow" />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      )}
      <div className="final-step__footer">
        <div className="final-step__footer_item">
          <img src={check_circle} alt="check circle" />
          <p className="final-step__footer_item_title">
            {t("form.security.param1")}
          </p>
        </div>
        <div className="final-step__footer_item">
          <img src={lock} alt="lock" />
          <p className="final-step__footer_item_title">
            {t("form.security.param2")}
          </p>
        </div>
        <div className="final-step__footer_item">
          <img src={search} alt="search" />
          <p className="final-step__footer_item_title">
            {t("form.security.param3")}
          </p>
        </div>
      </div>
    </>
  );
}
