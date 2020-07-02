import React from "react";
import {
  Form,
  Segment,
  Grid,
  Button,
  Message,
  Divider,
  Image,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import logo from "../../assets/signin-logo.png";

const TeamNameSchema = Yup.object().shape({
  team_name: Yup.string()
    .trim()
    .matches(
      /[A-Za-z0-9\_\-\ ]+/,
      "Must be alphanumeric and may have spaces, hyphens, or underscores"
    )
    .required("Required")
});

const TeamCreateForm = () => (
  <Formik
    initialValues={{ team_name: "" }}
    validationSchema={TeamNameSchema}
    onSubmit={(values: any) => {
      alert(JSON.stringify(values, null, 2));
    }}
  >
    {(props) => (
      <Form size="large" onSubmit={props.handleSubmit}>
        <Segment inverted padded className="black">
          <Image src={logo} fluid />
          <Divider hidden />
          <Form.Input
            fluid
            icon="users"
            iconPosition="left"
            name="team_name"
            placeholder="Team Name"
            onChange={props.handleChange}
            value={props.values.team_name}
            error={
              props.errors.team_name && props.touched.team_name
                ? props.errors.team_name
                : null
            }
          />
          <Button type="submit" color="red" fluid size="medium">
            Create Team
          </Button>
        </Segment>
      </Form>
    )}
  </Formik>
);

const Create = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <TeamCreateForm />
        <Message color="black">
          Have a team already? <Link to="/team/join">Join Team</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Create;
