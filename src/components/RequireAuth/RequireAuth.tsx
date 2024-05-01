import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import styles from "./RequireAuth.module.scss";

export default function RequireAuth({ allowedRoles }) {
  // const navigate = useNavigate();
  const { auth } = useAuth();
  // console.log(auth);
  // console.log(auth.roles.);

  if (auth.accessToken) {
    if (allowedRoles.every((role) => auth.roles.includes(role))) {
      return <Outlet></Outlet>;
    } else {
      console.log("no permissions");
    }
  } else {
    console.log("not logged in");
  }
}
