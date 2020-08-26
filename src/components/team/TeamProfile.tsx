import { Grid, Segment, Header, Divider, List } from "semantic-ui-react";
import React from "react";
import { SemanticToastContainer } from "react-semantic-toasts";

export const TeamProfile = (props: any) => {
  const { user } = props;
  const team = user.team;
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 350 }}>
        <Segment inverted padded className="black">
          <Header as="h2" color="black">
            {team.name}
          </Header>
          <Divider />
          <List>
            {team.members.map((member: any) => (
              <List.Item>{member?.profile?.name || member.email}</List.Item>
            ))}
          </List>
        </Segment>
        <SemanticToastContainer position="bottom-right" />
      </Grid.Column>
    </Grid>
  );
};