import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as actions from "../../_actions";
import { Segment, Grid, Button, Icon, Header } from "semantic-ui-react";
import { Link } from 'react-router-dom';

const dispatchVerify = async (token: string, dispatch: any) => {
  try {
    const body = {
      token: token,
    };
    const response = await dispatch(actions.users.verifyEmail(body));
    return { success: true, data: response?.body?.data?.verified };
  } catch {
    return { success: false };
  }
};

const Verify = () => {
  const dispatch = useDispatch();
  let { token }: any = useParams();
  let [user, setUser] = useState(false);

  useEffect(() => {
    dispatchVerify(token, dispatch).then((res) => {
      if (res.success) {
        setUser(res.data);
      }
    });
  }, []);

  return user ? (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <Segment inverted padded className="black">
          <Icon size="huge" name="check circle" />
          <Header as='h3'>Your email has been verified!</Header>
          <Button as={Link} to='/' color="red">Return to Dashboard</Button>
        </Segment>
      </Grid.Column>
    </Grid>
  ) : (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <Segment inverted padded className="black">
          <Icon size="huge" name="times circle" />
          <Header as='h3'>Verification failed!</Header>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default Verify;
