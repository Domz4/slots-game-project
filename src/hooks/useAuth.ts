import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { setToken } from "../store/authSlice";

const useAuth = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const dispatch = useDispatch();

  const saveToken = (token: string | null) => {
    dispatch(setToken(token));
  };

  return { token, saveToken };
};

export default useAuth;
