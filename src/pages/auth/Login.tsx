import React from 'react';
import {
  Image,
  Grid,
  Divider,
  Form,
  Segment,
  Button,
  Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import logo from '../../assets/signin-logo.png';
import './Login.css';

const LoginForm = () => (
  <Formik
    initialValues={{ email: '', password: '' }}
    onSubmit={(values) => {
      alert(JSON.stringify(values, null, 2));
    }}
  >
    {(props) => (
      <Form size="large" onSubmit={props.handleSubmit}>
        <Segment inverted padded className="black">
          <Image src={logo} fluid/>
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

const Login = () => (
  <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
    <Grid.Column style={{ maxWidth: 350 }}>
      <LoginForm />
      <Message color="black">
        No account yet? <Link to="/register">Sign Up</Link>
      </Message>
    </Grid.Column>
  </Grid>
);

export default Login;
