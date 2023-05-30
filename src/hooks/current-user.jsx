import { useDispatch, useSelector } from "react-redux";
import { useCurrentUserQuery } from "../redux/api/apiSlice";
import {
  currentUserFail,
  currentUserSuccess,
} from "../redux/slices/current-userSlice";

export default function CurrentUser() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.currentuser);
  const data = useCurrentUserQuery();

  console.log("Current user", data);

  console.log("User in state", User);

  if (data) {
    return dispatch(currentUserSuccess(data));
  }
  return dispatch(currentUserFail(null));
}
