import React from "react";
import { Grid, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../_actions";

const TeamJoinForm = () => {
  // TODO: create a table showing team invites
  const dispatch = useDispatch();
  const store = useStore();
  const state = store.getState();
  console.log("State", state);

  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      console.log("Fetching data");
      setLoading(true);
      await dispatch(actions.teams.invitations("5f00fba75b467761608b44d3"));
      setLoading(false);
      console.log("Done fetching");
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
