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

const TeamJoinForm = () => {
  // TODO: create a table showing team invites
  return null;
};

const Join = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <TeamJoinForm />
        <Message color="black">
          Want to create a team instead?{" "}
          <Link to="/team/create">Create Team</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default Join;
