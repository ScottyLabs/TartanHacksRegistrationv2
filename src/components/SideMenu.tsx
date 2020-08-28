import React from "react";
import { Sidebar, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import sidebarLogo from "../assets/sidebar-logo.svg";
import removeAccessToken from "../util/removeAccessToken";
import { useSelector } from "react-redux";
import { getUserFromState } from "../util/getUser";

const SideMenu = (props: any) => {
  const state = useSelector((state) => state);
  const user = getUserFromState(state);
  const isAdmin = user?.admin || false;
  const isEmployer = user?.employer || false;
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
          <img src={sidebarLogo} alt="TartanHacks" />
        </Menu.Item>
        <Menu.Item as={Link} to="/">
          Home
        </Menu.Item>
        {isAdmin ? (
          <Menu.Item as={Link} to="/">
            Admin
          </Menu.Item>
        ) : null}
        {!isEmployer && !isAdmin ? (
          <Menu.Item as={Link} to="/team">
            Team
          </Menu.Item>
        ) : null}
        <Menu.Item
          onClick={() => {
            removeAccessToken();
          }}
          as={Link}
          to="/login"
        >
          Log Out
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher>{props.children}</Sidebar.Pusher>
    </Sidebar.Pushable>
  );
};

export default SideMenu;
