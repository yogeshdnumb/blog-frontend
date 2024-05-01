import { useEffect } from "react";
import axios from "../api/axios.js";
import useAuth from "./useAuth.js";
import useRefreshToken from "./useRefreshToken";

export default function useAxiosPrivate() {
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    // console.log("useeffec");

    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        // console.log("useeffect in private", auth, config.headers);
        if (!config.headers["Authorization"] && auth) {
          // console.log("auth",auth);

          config.headers["Authorization"] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      (err) => {
        Promise.reject(err);
        // console.log("err in request");
      }
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => {
        return response;
      },
      async (err) => {
        // console.log(err.response.status,err.config);

        const prevReq = err?.config;
        if (err?.response?.status === 403 && prevReq?.sent) {
          prevReq.sent = true;
          // console.log("int");

          const newAccessToken = await refresh();
          // console.log("err in res intersp", newAccessToken);
          prevReq.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(prevReq);
        }
        return Promise.reject(err);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);
  return axios;
}
