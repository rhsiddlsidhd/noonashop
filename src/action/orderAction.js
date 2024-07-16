import api from "../utils/api";
import * as types from "../constants/order.constants";
import { cartActions } from "./cartAction";
import { commonUiActions } from "./commonUiAction";

const createOrder = (payload, navigate) => async (dispatch) => {
  try {
    console.log("kk", payload);
    dispatch({ type: types.CREATE_ORDER_REQUEST });
    const res = await api.post("/order", payload);
    if (res.status !== 200) {
      throw new Error(res.error);
    }

    dispatch(cartActions.getCartQty());
    navigate("/payment/success");
    // dispatch({ type: types.CREATE_ORDER_SUCCESS });
  } catch (err) {
    dispatch({ type: types.CREATE_ORDER_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const getOrder = () => async (dispatch) => {};
const getOrderList = (query) => async (dispatch) => {};

const updateOrder = (id, status) => async (dispatch) => {};

export const orderActions = {
  createOrder,
  getOrder,
  getOrderList,
  updateOrder,
};
