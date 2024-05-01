import styles from "./Register.module.scss";

import { useEffect, useRef, useState } from "react";
import axios from "../../api/axios.js";
import { Link } from "react-router-dom";
import { Lock, User } from "react-feather";

export default function Register() {
  const [username, setUsername] = useState("");
  // const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [isUsernameFocus, setIsUsernameFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  // const [isPwdValid, setIsPwdValid] = useState(false);
  const [isPwdFocus, setIsPwdFocus] = useState(false);

  const [confirmPwd, setConfirmPwd] = useState("");
  // const [isConfirmPwdValid, setIsConfirmPwdValid] = useState(false);
  const [isConfirmPwdFocus, setIsConfirmPwdFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  // const [success, setSuccess] = useState(false);

  const usernameRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [username, pwd, confirmPwd]);

  // useEffect(() => {
  //   setIsUsernameValid(username.length > 2);
  // }, [username]);

  const isUsernameValid = username.length > 2;
  const isPwdValid = pwd.length > 2;
  const isConfirmPwdValid = pwd == confirmPwd && isPwdValid;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/register",
        JSON.stringify({ username, password: pwd }),
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      console.log(response.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No server response");
      } else if (err.response?.status == 409) {
        setErrMsg("Username taken");
      } else {
        setErrMsg("Registration failed");
      }
      // errRef.current.focus();
    }
  }

  return (
    <div className={styles.Register}>
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
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            ref={usernameRef}
            required
            placeholder=""
            aria-invalid={isUsernameValid ? "false" : "true"}
            aria-describedby="usernameNote"
            onFocus={() => {
              setIsUsernameFocus(true);
            }}
            onBlur={() => {
              setIsUsernameFocus(false);
            }}
          />
          <label htmlFor="username">
            <User></User>
            Username
            {/* {isUsernameValid && "✔️"} */}
            {!isUsernameValid && username && "❌"}
          </label>
          {!isUsernameValid && username && <p id="usernameNote">{">2"}</p>}
        </div>
        <div className={styles.passwordContainer}>
          <input
            type="text"
            id="pwd"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            required
            placeholder=""
            aria-invalid={isPwdValid ? "false" : "true"}
            aria-describedby="pwdNote"
            onFocus={() => {
              setIsPwdFocus(true);
            }}
            onBlur={() => {
              setIsPwdFocus(false);
            }}
          />
          <label htmlFor="pwd">
            <Lock></Lock>
            Password
            {/* {isPwdValid && "✔️"} */}
            {!isPwdValid && pwd && "❌"}
          </label>
          {!isPwdValid && pwd && <p id="pwdNote">{">2"}</p>}
        </div>
        <div className={styles.confirmPwdContainer}>
          <input
            type="text"
            id="confirmPwd"
            value={confirmPwd}
            onChange={(e) => setConfirmPwd(e.target.value)}
            required
            placeholder=""
            aria-invalid={isConfirmPwdValid ? "false" : "true"}
            aria-describedby="confirmPwdNote"
            onFocus={() => {
              setIsConfirmPwdFocus(true);
            }}
            onBlur={() => {
              setIsConfirmPwdFocus(false);
            }}
          />
          <label htmlFor="confirmPwd">
            <Lock></Lock>
            Cofirm Password
            {/* {isConfirmPwdValid && "✔️"} */}
            {!isConfirmPwdValid && confirmPwd && " ❌"}
          </label>
          {!isConfirmPwdValid && confirmPwd && (
            <p id="confirmPwdNote">{"should match password"}</p>
          )}
        </div>

        <button
          className={
            !(isUsernameValid && isPwdValid && isConfirmPwdValid) &&
            styles.disabled
          }
        >
          Register
        </button>
      </form>
      <p className={styles.misc}>
        or
        <Link to="/login"> Login</Link>
      </p>
    </div>
  );
}
