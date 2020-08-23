import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../_actions";
import { Segment, Grid, Button, Icon, Header, Form } from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import { SemanticToastContainer } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "At least 8 characters, contains uppercase, lowercase, numbers, and symbols"
    )
    .required("Required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Passwords must match")
    .required("Required"),
});

const EmailForm = () => {
  const dispatch = useDispatch();
  const [sent, setSent] = useState(false);
  let body;
  if (sent) {
    body = (
      <Segment inverted padded className="black">
        <Icon size="huge" name="check circle" />
        <Header as="h3">
          The password reset link has been sent to your email!
        </Header>
      </Segment>
    );
  } else {
    body = (
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          const response = await dispatch(
            actions.users.resetPasswordEmail(values)
          );
          setSent(true);
        }}
      >
        {(props) => (
          <Form size="large" onSubmit={props.handleSubmit}>
            <Segment inverted padded className="black">
              <Header>Reset Password</Header>
              <Form.Input
                fluid
                icon="mail"
                iconPosition="left"
                name="email"
                placeholder="Email Address"
                onChange={props.handleChange}
                value={props.values.email}
                error={
                  props.errors.email && props.touched.email
                    ? props.errors.email
                    : null
                }
              />
              <Button type="submit" color="red" fluid size="medium">
                Send Reset Email
              </Button>
            </Segment>
          </Form>
        )}
      </Formik>
    );
  }
  return body;
};

const ResetEmail = () => {
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 350 }}>
          <EmailForm />
        </Grid.Column>
      </Grid>
      <SemanticToastContainer />
    </>
  );
};

const PasswordForm = () => {
  const dispatch = useDispatch();
  const { token }: any = useParams();
  const [reset, setReset] = useState(false);

  let body;
  if (reset) {
    body = (
      <Segment inverted padded className="black">
        <Icon size="huge" name="check circle" />
        <Header as="h3">Your password has been changed!</Header>
        <Button as={Link} to="/login" color="red" fluid size="medium">
          Return to Login
        </Button>
      </Segment>
    );
  } else {
    body = (
      <Formik
        initialValues={{ password: "", confirm: "" }}
        validationSchema={ResetSchema}
        onSubmit={async (values) => {
          try {
            const body = {
              token: token,
              password: values.password,
            };
            await dispatch(actions.users.resetPassword(body));
            setReset(true);
          } catch (err) {}
        }}
      >
        {(props) => (
          <Form size="large" onSubmit={props.handleSubmit}>
            <Segment inverted padded className="black">
              <Header>Reset Password</Header>
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="password"
                placeholder="New Password"
                type="password"
                onChange={props.handleChange}
                value={props.values.password}
                error={
                  props.errors.password && props.touched.password
                    ? props.errors.password
                    : null
                }
              />
              <Form.Input
                fluid
                icon="lock"
                iconPosition="left"
                name="confirm"
                placeholder="Confirm New Password"
                type="password"
                onChange={props.handleChange}
                value={props.values.confirm}
                error={
                  props.errors.confirm && props.touched.confirm
                    ? props.errors.confirm
                    : null
                }
              />
              <Button type="submit" color="red" fluid size="medium">
                Change Password
              </Button>
            </Segment>
          </Form>
        )}
      </Formik>
    );
  }

  return body;
};

const ResetPassword = () => {
  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 350 }}>
          <PasswordForm />
        </Grid.Column>
      </Grid>
      <SemanticToastContainer />
    </>
  );
};

export { ResetEmail, ResetPassword };
