import React from "react";
import SideMenu from "../components/SideMenu";
import { Grid } from "semantic-ui-react";
import DashInfo from "../components/DashInfo";
import { getUserFromState } from "../util/getUser";
import { useSelector } from "react-redux";

interface userStatus {
  verified: boolean;
  completed: boolean;
  admitted: boolean;
  confirmed: boolean;
  declined: boolean;
}

const getStatus = (user: any): userStatus | null => {
  if (user) {
    return {
      verified: user.verified,
      completed: user.status.completedProfile,
      admitted: user.status.admitted,
      confirmed: user.status.confirmed,
      declined: user.status.declined,
    };
  }
  return null;
};

const Home = () => {
  const state = useSelector((state) => state);
  const user = getUserFromState(state);
  let userStatus = getStatus(user);

  return (
    <SideMenu>
      <Grid verticalAlign="middle" style={{ height: "100vh" }} centered>
        <Grid.Row>
          <Grid.Column width={10}>
            <DashInfo name={user?.profile?.name} status={userStatus} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </SideMenu>
  );
};

export default Home;
