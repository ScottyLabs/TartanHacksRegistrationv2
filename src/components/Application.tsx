import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import SchoolField from "./SchoolField"
import swal from "sweetalert";
import axios from "axios";

const EMAIL = "richgtx@gmail.com";

const Application = (props: any) => {
  const [state, setState] = useState({
    user: {
      email: "",
      verified: false,
      status: {
        completedProfile: false,
      },
      profile: {
        name: "",
        school: "",
        graduationYear: null,
        gender: null,
        phoneNumber: null,
        major: null,
        experience: null,
        github: "",
        resume: ""
      },
    },
    isCmuStudent: false,
    regIsClosed: false,
    loading: false,
    schools: [],
    autoFilledSchool: false,
  });

  function _updateUser() {
    // UserService.updateProfile(Session.getUserId(), $scope.user.profile).then(
    //   (response) => {
    //     swal("Awesome!", "Your application has been saved.", "success").then(
    //       (value) => {
    //         $state.go("app.dashboard");
    //       }
    //     );
    //   },
    //   (response) => {
    //     swal(
    //       "Uh oh!",
    //       "Something went wrong. Please make sure you have entered a valid phone number, or contact hello@scottylabs.org for help.",
    //       "error"
    //     );
    //   }
    // );
    console.log("_updateUser()");
    console.log(state.user.profile);
  }

  function _storeResume(resumeFile: any) {
    const resumeName = state.user.profile.name.replace(/\s/g, "_") + "_Resume";
    //const resumeFile = document.getElementById("resume").files[0];

    console.log(resumeFile);
    if (resumeFile.size > 5000000) {
      swal(
        "Uh oh.",
        "Your resume is too big. Please upload a smaller resume.",
        "error"
      );
      return;
    }
    let reader = new FileReader();
    // setState({
    //   ...state,
    //   [state.user.profile.email]: state.user.email,
    // });
    reader.onload = () => {
      let data = {
        resumeName: resumeName,
        dataURL: reader.result,
        profile: state.user.profile,
        fileId: state.user.profile.resume,
      };
      let firstTimeSubmitting =
        state.user.verified && !state.user.status.completedProfile;
      if (firstTimeSubmitting) {
        axios.post("/api/users/resume", data).then(
          (res) => {
            setState({
              ...state,
              [state.user.profile.resume]: res.data.fileId
            });
            _updateUser();
          },
          (err) => {
            swal(
              "There was a resume submission error, please contact hello@scottylabs.org immediately."
            );
            console.log(JSON.stringify(err));
          }
        );
      } else {
        axios.put("/api/users/resume", data).then(
          (res) => {
            _updateUser();
          },
          (err) => {
            swal(
              "There was a resume submission error, please contact hello@scottylabs.org immediately."
            );
            console.log(JSON.stringify(err));
          }
        );
      }
    };
    reader.readAsDataURL(resumeFile);
  }

  // const submitResume = () => {
  //   if ($(".ui.form").form("is valid")) {
  //     swal(
  //       "Please don't click the submit button or refresh until the resume finishes uploading!",
  //       { button: false }
  //     );
  //     _storeResume();
  //   } else {
  //     swal("Uh oh!", "Please Fill The Required Fields", "error");
  //   }
  // }

  

  const formik = useFormik({
    initialValues: {
      school: "",
      name: "",
      graduationYear: "",
      gender: "",
      phoneNumber: "",
      major: "",
      experience: "",
      github: "",
      resume: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div id="application" className="page">
      <div className="title">Application</div>

      <div className="ui stackable page grid">
        <div className="column">
          <Formik
            initialValues={{
              email: EMAIL,
              school: "",
              name: "",
              graduationYear: "",
              gender: "",
              phoneNumber: "",
              major: "",
              experience: "",
              github: "",
              resume: "",
            }}
            onSubmit={(values) => {
              console.log(values);
            }}
          >
            <Form className={`ui form ${state.loading ? "loading" : ""}`}>
              <fieldset disabled={state.regIsClosed}>
                <div className="divided title"> Basic Details </div>
                <div className="surround-fields">
                  {/* <label htmlFor="firstName">
                    Email Address <span className="required">*</span>
                  </label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="email"
                    disabled
                  /> */}
                  <div className="field">
                    <label>
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      disabled
                      placeholder="email"
                      onChange={formik.handleChange}
                      value={EMAIL}
                    />
                  </div>

                  <div className="field">
                    <label>
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      onChange={formik.handleChange}
                      value={formik.values.name}
                      required
                    />
                  </div>

                  <SchoolField
                    isCmuStudent={state.isCmuStudent}
                    autoFilledSchool={state.autoFilledSchool}
                    formik={formik}
                  />

                  <div className="field">
                    <label>
                      Graduation Year <span className="required">*</span>
                    </label>
                    <select
                      name="graduationYear"
                      placeholder="Graduation Year"
                      onChange={formik.handleChange}
                      value={formik.values.graduationYear}
                      required
                    >
                      <option value="" disabled hidden>
                        Choose one...
                      </option>
                      <option value="2020">2020</option>
                      <option value="2021">2021</option>
                      <option value="2022">2022</option>
                      <option value="2023">2023</option>
                      <option value="2024">2024</option>
                    </select>
                  </div>

                  <div className="field">
                    <label>
                      Gender <span className="required">*</span>
                    </label>
                    <select
                      name="gender"
                      placeholder="gender"
                      onChange={formik.handleChange}
                      value={formik.values.gender}
                      required
                    >
                      <option value="" disabled hidden>
                        Choose one...
                      </option>
                      <option value="M">Male</option>
                      <option value="F">Female</option>
                      <option value="O">Other</option>
                      <option value="N">I prefer not to answer.</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>
                      Phone Number <span className="required">*</span>
                    </label>
                    <p>
                      We need this in case we need to get ahold of you! (10
                      digits without dashes)
                    </p>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="1235556789"
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                      required
                    />
                  </div>
                </div>
                <br />
                <br />

                <div className="divided title"> Skills & Accomplishments </div>
                <div className="surround-fields">
                  <div className="field">
                    <label>
                      Major <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="major"
                      placeholder="Computer Science, Product Design, Engineering, etc."
                      onChange={formik.handleChange}
                      value={formik.values.major}
                      required
                    />
                  </div>
                  <div className="field">
                    <label> Hackathon Experience </label>
                    <select
                      name="gender"
                      onChange={formik.handleChange}
                      value={formik.values.experience}
                    >
                      <option value="" disabled hidden>
                        Choose one...
                      </option>
                      <option value="0">0</option>
                      <option value="1~3">1-3</option>
                      <option value="4+">4+</option>
                    </select>
                  </div>
                  <div className="field">
                    <label> Github </label>
                    <input
                      type="text"
                      name="github"
                      placeholder="https://github.com/foobar"
                      onChange={formik.handleChange}
                      value={formik.values.github}
                    />
                  </div>
                  <div className="field">
                    <label>
                      Resume <span className="required">*</span>
                    </label>
                    <p>Upload a PDF resume. (5MB limit)</p>
                    <input
                      type="file"
                      name="resume"
                      accept="application/pdf"
                      id="resume"
                      onChange={(event) => {
                        //formik.values.resume = event.currentTarget.files[0];
                      }}
                      value={formik.values.resume}
                      required
                    />
                  </div>
                  <br />
                  If you have any questions or concerns about your application,
                  please contact hello@scottylabs.org.
                </div>

                <br />

                <div className="field" ng-hide="regIsClosed">
                  <button type="submit" className="fluid ui button">
                    Submit
                  </button>
                </div>
              </fieldset>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Application;
