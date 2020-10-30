import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutRequest } from "../../actions/user.action";

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    localStorage.clear();
    dispatch(logoutRequest());
  }, []);
  return null;
};

export default Logout;
