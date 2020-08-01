import React, { Component } from 'react';
import SideMenu from '../../components/SideMenu';
import { useStore } from 'react-redux';

const TeamComponent = () => {
  return (
    <></>
  )
}

const Team = () => {
  const store = useStore();
  const state = store.getState();
  const currentUser = state?.users;
  console.log(currentUser);

  return (
    <SideMenu
      content={
        <TeamComponent />
      }
    />
  )
};

export default Team;
