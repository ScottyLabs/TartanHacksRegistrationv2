import React from "react";
import {
  Grid,
  Message,
  Segment,
  Divider,
  Button,
  Image,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch, useStore } from "react-redux";
import { useEffect, useState } from "react";
import * as actions from "../../_actions";
import getCurrentUser from "../../util/getCurrentUser";
import SideMenu from "../../components/SideMenu";
import { SemanticToastContainer } from "react-semantic-toasts";

const TeamInviteComponent = (props: any) => {
  const { user } = props;

  if (!user.teamInvite) {
    return (
      <>
        <Segment inverted padded className="black">
          <Message color="black">
            You don't have any pending team invites
          </Message>
          <Divider hidden />
        </Segment>
      </>
    );
  } else {
    return (
      <Segment inverted padded className="black">
        <Message color="black">You don't have any pending team invites</Message>
        <Divider hidden />
      </Segment>
    );
  }
};

const Join = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state: any) => state.users);

  useEffect(() => {
    getCurrentUser(dispatch, history);
  }, []);

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
      content={
        <Grid
          textAlign="center"
          style={{ height: "100vh" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 350 }}>
            <TeamInviteComponent user={user} />
            <Message color="black">
              Want to create one yourself?{" "}
              <Link to="/team/create">Create team</Link>
            </Message>
            <SemanticToastContainer position="bottom-right" />
          </Grid.Column>
        </Grid>
      }
    />
  );
};

export default Join;
