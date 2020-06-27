import React from 'react';
import {
  Grid,
  Image,
  Divider,
  Form,
  Segment,
  Button,
  Message,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/signin-logo.png';
import './Login.css';

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'At least 8 characters, contains uppercase, lowercase, numbers, and symbols'
    )
    .required('Required'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Required'),
});

const SignupForm = () => (
  <Formik
    initialValues={{ email: '', password: '', confirm: '' }}
    validationSchema={SignupSchema}
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
            error={
              props.errors.email && props.touched.email
                ? props.errors.email
                : null
            }
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
            placeholder="Confirm Password"
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
            Sign up
          </Button>
        </Segment>
      </Form>
    )}
  </Formik>
);

const Register = () => {
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <SignupForm />
        <Message color="black">
          Have an account already? <Link to="/login">Log in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Register;
