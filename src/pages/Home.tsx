import React from 'react';
import SideMenu from '../components/SideMenu';
import { Sidebar, Grid } from 'semantic-ui-react';
import DashInfo from '../components/DashInfo';

const Home = () => {
  return (
    <SideMenu
      content={
        <Grid verticalAlign="middle" style={{ height: '100vh' }} centered>
          <Grid.Row>
            <Grid.Column width={10}>
              <DashInfo name="Andrew Carnegie" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      }
    />
  );
};

export default Home;
