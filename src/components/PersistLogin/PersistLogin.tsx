// import styles from "./PersistLogin.module.scss";

import { useEffect, useState } from "react";
import useRefreshToken from "../../hooks/useRefreshToken";
import useAuth from "../../hooks/useAuth";
import { Outlet } from "react-router-dom";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    async function verifyRefresh() {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    !auth.accessToken ? verifyRefresh() : setIsLoading(false);
  }, [refresh, auth]);
  return <>{isLoading ? <p>Loading</p> : <Outlet></Outlet>}</>;
}
