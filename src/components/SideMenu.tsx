import React from 'react';
import { Sidebar, Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

interface sideMenuProps {
  content: any;
}

const SideMenu = (props: sideMenuProps) => {
  return (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        size="large"
        visible={true}
        width="thin"
      >
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Admin
        </Menu.Item>
        <Menu.Item as={Link} to="/login">
          Log Out
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>{props.content ? props.content : null}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SideMenu;
