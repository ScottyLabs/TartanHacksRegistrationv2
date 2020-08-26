import React, { useEffect } from "react";
import SideMenu from "../../components/SideMenu";
import { getCurrentUser, getUserFromState } from "../../util/getUser";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import logo from "../../assets/signin-logo.png";
import {
  Grid,
  Message,
  Segment,
  Divider,
  Button,
  Image,
  Header,
  List,
} from "semantic-ui-react";
import { SemanticToastContainer } from "react-semantic-toasts";
import { TeamProfile } from "../../components/team/TeamProfile";

const TeamCreateOrJoinComponent = () => {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <Segment inverted padded className="black">
          <Image src={logo} fluid />
          <Message color="black">Oops, you don't have a team yet!</Message>
          <Divider hidden />
          <Link to="/team/create" color="white">
            <Button color="red">Create Team</Button>
          </Link>
          <Link to="/team/join" color="white">
            <Button color="red">Join Team</Button>
          </Link>
        </Segment>
        <SemanticToastContainer position="bottom-right" />
      </Grid.Column>
    </Grid>
  );
};

const Team = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state: any) => state.users);

  useEffect(() => {
    getCurrentUser(dispatch, history);
  }, []);

  const user = getUserFromState(state);
  if (!user || user?.admin || user?.employer) {
    return null;
  }

  if (!user.team) {
    // Show join/create team page
    return <SideMenu children={<TeamCreateOrJoinComponent />} />;
  } else {
    // Redirect to team view
    return <SideMenu children={<TeamProfile user={user} />} />;
  }
};

export default Team;
