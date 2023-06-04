/* eslint-disable react/prop-types */
import React from "react";
import { useCurrentUserQuery } from "../redux/api/apiSlice";

export default function CheckRole(props) {
  const { children, roles, ...otherProps } = props;
  const { data } = useCurrentUserQuery();

  const role = data?.currentUser.role || null;

  if (roles?.includes(role))
    return <React.Fragment {...otherProps}>{children}</React.Fragment>;

  return <React.Fragment {...otherProps} />;
}
