import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserFromState, getCurrentUser } from "./util/getUser";
import { Redirect, Route } from "react-router-dom";

interface IProps {
  children: React.ReactNode;
  path: string;
}

export default ({ children, ...rest }: IProps) => {
  const [loading, setLoading] = useState(true);
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const user = getUserFromState(state);

  let isLoggedIn = user != null;

  useEffect(() => {
    getCurrentUser(dispatch).then(() => {
      isLoggedIn = user != null;
      setLoading(false);
    });
  }, []);

  return loading ? null : (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
};
