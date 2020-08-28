import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUser, getUserFromState } from "../../util/getUser";
import SideMenu from "../../components/SideMenu";
import { TeamProfile } from "../../components/team/TeamProfile";

const View = () => {
  const state = useSelector((state: any) => state.users);

  const user = getUserFromState(state);
  if (!user || !(user?.admin || user?.employer)) {
    return <SideMenu />;
  }
  
  return <SideMenu children={<TeamProfile user={user} />} />;
};

export default View;
