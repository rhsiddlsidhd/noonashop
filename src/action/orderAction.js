import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";
import { UPDATE_ORDER_SUCCESS } from "./../constants/order.constants";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const res = await api.post("/order", payload);

    dispatch(cartActions.getCartQty());
    dispatch({ type: types.CREATE_ORDER_SUCCESS, payload: res.data.orderNum });
    navigate("/payment/success");
  } catch (err) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: err.message });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
    navigate("/cart");
  }
};

const getOrder = () => async (dispatch) => {
  /**
   * 내 주문 리스트 보여주기
   * API  req = userId
   * DB 에서 userID 와 일치하는 Model.order userId 가져오기
   */
  try {
    dispatch({ type: types.GET_ORDER_REQUEST });
    const res = await api.get("/order/me");

    dispatch({ type: types.GET_ORDER_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_ORDER_FAIL });
  }
};

/**
 * admin page 이므로
 *level= admin 이 아닐경우 메인페이지로 이동
 */

const getOrderList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_ORDER_LIST_REQUEST });

    const res = await api.get("/order/admin", { params: { ...query } });
    dispatch({ type: types.GET_ORDER_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.GET_ORDER_LIST_FAIL, payload: err.message });
  }
};

const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: types.UPDATE_ORDER_REQUEST });
    console.log(id);

    const res = await api.put(`/order/admin/${id}`, { status });
    console.log(res.data.data);

    dispatch({ type: types.UPDATE_ORDER_SUCCESS, payload: res.data });
    dispatch(
      commonUiActions.showToastMessage("status update Success", "success")
    );
  } catch (err) {
    dispatch({ type: types.UPDATE_ORDER_FAIL, payload: err.error });
  }
};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
