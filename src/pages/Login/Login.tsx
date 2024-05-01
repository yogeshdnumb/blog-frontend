import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios.js";

import styles from "./Login.module.scss";
import useRefreshToken from "../../hooks/useRefreshToken.js";
import useAuth from "../../hooks/useAuth.js";
import { useNavigate, Link } from "react-router-dom";

import { Lock, User, Eye, EyeOff } from "react-feather";

/* import userIcon from "../../assets/user.svg";
import pwdIcon from "../../assets/lock.svg" */

// import feather from "feather-icons";

export default function Login() {
  const navigate = useNavigate();
  // const refresh = useRefreshToken();

  const { setAuth, auth } = useAuth();

  const [username, setUsername] = useState("");
  const [pwd, setPwd] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const [isPwdVisible, setIsPwdVisible] = useState(false);

  const usernameRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        JSON.stringify({ username, password: pwd }),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response.data, auth);

      setAuth({
        accessToken: response?.data?.accessToken,
        roles: response?.data?.roles,
      });
      navigate("/articles");
    } catch (err) {
      // console.error(err);

      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status == 400) {
        setErrMsg("Username or Password missing");
      } else if (err.response?.status == 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login failed");
      }
    }
  }

  return (
    <div className={styles.Login}>
      <h1>Welcome!</h1>

      <form onSubmit={handleSubmit}>
        {errMsg && (
          <p ref={errRef} className={styles.errMsg}>
            {errMsg}
          </p>
        )}
        <div className={styles.usernameContainer}>
          <input
            type="text"
            id="username"
            ref={usernameRef}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
            placeholder=""
          />
          <label htmlFor="username">
            <User></User>
            Username
          </label>
        </div>
        <div className={styles.usernameContainer}>
          <input
            type={isPwdVisible ? "text" : "password"}
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            placeholder=""
          />
          <label htmlFor="password">
            <Lock></Lock>
            Password
          </label>
          <span
            onClick={() => {
              setIsPwdVisible(!isPwdVisible);
            }}
          >
            {isPwdVisible ? (
              <Eye className={styles.eye}></Eye>
            ) : (
              <EyeOff className={styles.eye}></EyeOff>
            )}
          </span>
        </div>
        <button>Login</button>
      </form>
      <p className={styles.misc}>
        Or <Link to={"/register"}>Register</Link>
      </p>
    </div>
  );
}
