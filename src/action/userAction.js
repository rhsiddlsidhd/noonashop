import api from "../utils/api";
import * as types from "../constants/user.constants";
import { commonUiActions } from "./commonUiAction";
import * as commonTypes from "../constants/commonUI.constants";
const loginWithToken = (navigate) => async (dispatch) => {
  /**
   * 새로고침시에 user가 풀림 왜 ?
   * reducer로 user state를 관리하기때문에
   * 그러면 sessionStorage 에 있는 토큰의 여부를 따라 로그인 상태관리를 하면 새로침시에 풀리지 않음
   */

  try {
    dispatch({ type: types.LOGIN_WITH_TOKEN_REQUEST });
    const res = await api.get("/user/me");
    if (res.status !== 200) {
      throw new Error(res.error);
    }

    dispatch({ type: types.LOGIN_WITH_TOKEN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.LOGIN_WITH_TOKEN_FAIL, payload: err });
    dispatch(logout());
  }
};

const loginWithEmail =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.LOGIN_REQUEST });

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      if (res.status !== 200) {
        throw new Error(res.data.error);
      }
      sessionStorage.setItem("token", res.data.token);
      dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    } catch (err) {
      dispatch({ type: types.LOGIN_FAIL });
    }
  };

const logout = (navigate) => async (dispatch) => {
  /**
   * 유효하지않은 토큰이 존재하거나 또는 토큰이 존재하는경우
   * 토큰값을 지워준다
   * 토큰 + state 의 user 상태값도 null값으로 전환
   */

  dispatch({ type: types.LOGOUT });
  sessionStorage.removeItem("token");
};

const loginWithGoogle = (token) => async (dispatch) => {
  try {
    dispatch({ type: types.GOOGLE_LOGIN_REQUEST });
    const res = await api.post("/auth/google", { token });
    sessionStorage.setItem("token", res.data.token);
    dispatch({ type: types.GOOGLE_LOGIN_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.GOOGLE_LOGIN_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const registerUser =
  ({ email, name, password }, navigate) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.REGISTER_USER_REQUEST });
      const res = await api.post("/user", { email, name, password });
      if (res.status !== 200) {
        throw new Error(res.error);
      }
      dispatch({ type: types.REGISTER_USER_SUCCESS });
      dispatch(
        commonUiActions.showToastMessage("회원가입을 완료 했습니다.", "success")
      );
      navigate("/login");
    } catch (err) {
      dispatch({ type: types.REGISTER_USER_FAIL, payload: err.error });
    }
  };
export const userActions = {
  loginWithToken,
  loginWithEmail,
  logout,
  loginWithGoogle,
  registerUser,
};
