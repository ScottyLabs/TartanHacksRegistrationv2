import React, { Component, useState } from "react";
import { Icon, Header, Form, Segment, Grid, Button } from "semantic-ui-react";

const Create = () => {
  const [teamName, setTeamName] = useState("");

  const handleTeamNameChange = (e:any) => {
    setTeamName(e.target.value);
  }

  return (
    <>
      <Grid
        textAlign="center"
        style={{ height: "100vh" }}
        verticalAlign="middle"
        centered
        columns={1}
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center">
            Create/Join Team
          </Header>
          <Form size="large">
            <Form.Input
              fluid
              icon="users"
              iconPosition="left"
              placeholder="Team name"
              value={teamName}
              onChange={handleTeamNameChange}
            />
            <Grid columns={2} stackable>
              <Grid.Column>
                <Button fluid size="medium">
                  Create
                </Button>
              </Grid.Column>
              <Grid.Column>
                <Button fluid size="medium">
                  Join
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Create;
