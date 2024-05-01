import { useContext } from "react";
import { authContext } from "../contexts/authContext";

export default function useAuth() {
  return useContext(authContext)
}