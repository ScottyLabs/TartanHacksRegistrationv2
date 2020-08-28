import React, {  useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import {
  Form,
  Segment,
  Grid,
  Button,
  Message,
  Divider,
  Image,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import logo from "../../assets/signin-logo.png";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../_actions";
import { toast } from "react-semantic-toasts";
import "react-semantic-toasts/styles/react-semantic-alert.css";
import { getCurrentUser } from "../../util/getUser";

const TeamNameSchema = Yup.object().shape({
  team_name: Yup.string()
    .trim()
    .matches(
      /[A-Za-z0-9\_\-\ ]+/,
      "Must be alphanumeric and may have spaces, hyphens, or underscores"
    )
    .required("Required"),
});

const TeamCreateForm = (props: any) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = props;

  return (
    <Formik
      initialValues={{ team_name: "" }}
      validationSchema={TeamNameSchema}
      onSubmit={async (values: any) => {
        try {
          await dispatch(
            actions.teams.create(user.id, values)
          );
          history.push("/team");
        } catch (error) {
          console.log("Error");
          console.log(error.message);
          toast({
            type: "error",
            title: "Error",
            description: error.message,
            time: 5000,
          });
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
};

const Create = () => {
  const history = useHistory();
  const state = useSelector((state: any) => state.users);

  const user = state?.data?.user;
  if (!user || user?.admin || user?.employer) {
    return null;
  }

  if (user.teamId) {
    history.push("/team");
    return null;
  }

  return (
    <SideMenu
      children={
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 350 }}>
            <TeamCreateForm user={user} />
            <Message color="black">
              Have a team already? <Link to="/team/join">Join Team</Link>
            </Message>
          </Grid.Column>
        </Grid>
      }
    />
  );
};

export default Create;
