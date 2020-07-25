import React, { useEffect } from "react";
import SideMenu from "../components/SideMenu";
import { Grid } from "semantic-ui-react";
import DashInfo from "../components/DashInfo";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as actions from "../_actions";
import { useHistory } from "react-router-dom";

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();

  const verify = async () => {
    try {
      const body = {
        token: window.localStorage.getItem("accessToken")
      }
      await dispatch(actions.users.verifyToken(body));
    } catch {
      history.push("/login");
    }
  };

  useEffect(() => {
    verify();
  }, []);
  
  console.log(state);

  return (
    <SideMenu
      content={
        <Grid verticalAlign="middle" style={{ height: "100vh" }} centered>
          <Grid.Row>
            <Grid.Column width={10}>
              <DashInfo name="Andrew Carnegie" verified={false} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    />
  );
};

export default Home;
