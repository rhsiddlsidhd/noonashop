import api from "../utils/api";
import * as types from "../constants/cart.constants";
import { commonUiActions } from "../action/commonUiAction";
import { DELETE_CART_ITEM_REQUEST } from "./../constants/cart.constants";
import { useDispatch } from "react-redux";
const addToCart =
  ({ id, size }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.ADD_TO_CART_REQUEST });
      const res = await api.post("/cart/", { productId: id, size, qty: 1 });

      if (res.status !== 200) {
        throw new Error(res.error);
      }

      dispatch({ type: types.ADD_TO_CART_SUCCESS, payload: res.data });

      dispatch(
        commonUiActions.showToastMessage(
          "카트에 상품이 추가됐습니다.",
          "success"
        )
      );
    } catch (err) {
      dispatch({ type: types.ADD_TO_CART_FAIL, payload: err.error });
      commonUiActions.showToastMessage(err.message, "Error");
    }
  };

const getCartList = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_LIST_REQUEST });
    const res = await api.get("/cart");

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    dispatch({ type: types.GET_CART_LIST_SUCCESS, payload: res.data.data });
  } catch (err) {
    dispatch({ type: types.GET_CART_LIST_FAIL, payload: err.error });

    commonUiActions.showToastMessage(err.message, "Error");
  }
};

const deleteCartItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.DELETE_CART_ITEM_REQUEST });
    const res = await api.delete(`/cart/${id}`);

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    dispatch({ type: types.DELETE_CART_ITEM_SUCCESS, payload: res.data });

    dispatch(
      commonUiActions.showToastMessage("상품이 삭제 되었습니다.", "success")
    );
  } catch (err) {
    dispatch({ type: types.DELETE_CART_ITEM_FAIL, payload: err.error });
  }
};

const updateQty =
  ({ id, qty }) =>
  async (dispatch) => {
    try {
      dispatch({ type: types.UPDATE_CART_ITEM_REQUEST });

      const res = await api.put(`/cart/${id}`, { qty });
      if (res.status !== 200) {
        throw new Error(res.error);
      }
      console.log("kkk", res);
      dispatch({
        type: types.UPDATE_CART_ITEM_SUCCESS,
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({ type: types.UPDATE_CART_ITEM_FAIL, payload: err.error });
    }
  };

const getCartQty = () => async (dispatch) => {
  try {
    dispatch({ type: types.GET_CART_QTY_REQUEST });
    const res = await api.get("/cart/qty");
    if (res.status !== 200) {
      throw new Error(res.error);
    }

    dispatch({ type: types.GET_CART_QTY_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.GET_CART_QTY_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

export const cartActions = {
  addToCart,
  getCartList,
  deleteCartItem,
  updateQty,
  getCartQty,
};
