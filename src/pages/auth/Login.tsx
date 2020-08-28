import React from "react";
import {
  Image,
  Grid,
  Divider,
  Form,
  Segment,
  Button,
  Message,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import logo from "../../assets/signin-logo.png";
import "./Login.css";
import { useDispatch } from "react-redux";
import * as actions from "../../_actions";
import { useHistory, useLocation } from "react-router-dom";
import saveAccessToken from "../../util/saveAccessToken";
import { SemanticToastContainer } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { from }: any = location.state || { from: { pathname: "/" } };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      onSubmit={async (values) => {
        console.log("Submit");
        const response = await dispatch(actions.users.login(values));
        try {
          const token = response?.body?.data?.token;
          console.log(response);
          console.log("Received token", token);
          saveAccessToken(token);
          console.log("Saved access token");
          history.replace(from);
        } catch {
          console.log(response);
        }
      }}
    >
      {(props) => (
        <Form size="large" onSubmit={props.handleSubmit}>
          <Segment inverted padded className="black">
            <Image src={logo} fluid />
            <Divider hidden />
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              name="email"
              placeholder="Email Address"
              onChange={props.handleChange}
              value={props.values.email}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              name="password"
              placeholder="Password"
              type="password"
              onChange={props.handleChange}
              value={props.values.password}
            />
            <Button type="submit" color="red" fluid size="medium">
              Log in
            </Button>
          </Segment>
        </Form>
      )}
    </Formik>
  );
};

const Login = () => (
  <>
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <LoginForm />
        <Message color="black">
          No account yet? <Link to="/register">Sign Up</Link>
        </Message>
        <Message color="black">
          <Link to="/reset">Forgot Password?</Link>
        </Message>
      </Grid.Column>
    </Grid>
    <SemanticToastContainer />
  </>
);

export default Login;
