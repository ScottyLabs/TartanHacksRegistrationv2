import React, { useState } from "react";
import { Formik } from "formik";
//import SchoolField from "./SchoolField"
import swal from "sweetalert";
import axios from "axios";
import {
  Grid,
  Image,
  Divider,
  Form,
  Segment,
  Button,
  Message,
  Dropdown,
  Input,
} from "semantic-ui-react";
import "./Application.css";

const EMAIL = "richgtx@gmail.com";

// const graduationYears = ;

const ApplicationForm = (props: any) => {
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
        resume: "",
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
              [state.user.profile.resume]: res.data.fileId,
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

  // const formik = useFormik({
  //   initialValues: {
  //     school: "",
  //     name: "",
  //     graduationYear: "",
  //     gender: "",
  //     phoneNumber: "",
  //     major: "",
  //     experience: "",
  //     github: "",
  //     resume: "",
  //   },
  //   onSubmit: (values) => {
  //     console.log(values);
  //   },
  // });
  return (
    <Formik
      initialValues={{
        name: "",
        school: "",
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
      {(props) => (
        <Form onSubmit={props.handleSubmit}>
          <div className="title">Application</div>
          <Segment padded>
            <div className="divider-title">Basic Details</div>
            <Form.Input
              label="Full Name"
              name="name"
              placeholder="Full Name"
              onChange={props.handleChange}
              value={props.values.name}
              required
            />
            {/* TODO: School Field */}
            <Form.Dropdown
              label="Graduation Year"
              placeholder="Graduation Year"
              fluid
              selection
              required
              options={[
                { text: "2021", value: "2021" },
                { text: "2022", value: "2022" },
                { text: "2023", value: "2023" },
                { text: "2024", value: "2024" },
              ]}
            />
            <Form.Dropdown
              label="Gender"
              placeholder="Gender"
              fluid
              selection
              required
              options={[
                { text: "Male", value: "M" },
                { text: "Female", value: "F" },
                { text: "Other", value: "O" },
                { text: "I prefer not to answer", value: "N" },
              ]}
            />
            <Form.Input
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              placeholder="Phone Number"
              onChange={props.handleChange}
              value={props.values.phoneNumber}
              required
            />
            <Divider />
            <div className="divider-title">Skills & Accomplishments</div>
            <Form.Input
              label="Major"
              name="major"
              placeholder="Computer Science, Product Design, Engineering, etc."
              onChange={props.handleChange}
              value={props.values.major}
              required
            />
            <Form.Dropdown
              label="Hackathon Experience"
              placeholder="Hackathon Experience"
              fluid
              selection
              required
              options={[
                { text: "0", value: "0" },
                { text: "1-3", value: "1-3" },
                { text: "4+", value: "4+" },
              ]}
            />
            <Form.Input
              label="GitHub"
              name="github"
              placeholder="https://github.com/foobar"
              onChange={props.handleChange}
              value={props.values.github}
              required
            />
            {/* TODO: Resume */}
            <p>
              If you have any questions or concerns about your application,
              please contact hello@scottylabs.org.
            </p>

            <Button type="submit" color="red" fluid size="medium">
              Sign up
            </Button>
          </Segment>
        </Form>
      )}
    </Formik>
  );
};

const Application = () => (
  <>
    <Grid textAlign="center" style={{ height: "80vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 800 }}>
        
        <ApplicationForm />
      </Grid.Column>
    </Grid>
  </>
);

export default Application;
