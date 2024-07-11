import api from "../utils/api";
import * as types from "../constants/product.constants";
import { toast } from "react-toastify";
import { commonUiActions } from "./commonUiAction";

/** Redux Thunk
 * redux는 동기적 처리를 위한 동기적 상태 관리 도구
 * 따라서 redux thunk 미들웨어를 사용하여 비동기적 처리를 한다.
 * https://redux.js.org/usage/writing-logic-thunks
 */
const getProductList = (query) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_GET_REQUEST });

    const res = await api.get("/product", { params: { ...query } });

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    dispatch({ type: types.PRODUCT_GET_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: types.PRODUCT_GET_FAIL, payload: err.error });
  }
};

const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.GET_PRODUCT_DETAIL_REQUEST });
    const res = await api.get(`product/detail/${id}`);

    if (res.status !== 200) {
      throw new Error(res.error);
    }

    dispatch({
      type: types.GET_PRODUCT_DETAIL_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({ type: types.GET_PRODUCT_DETAIL_FAIL, payload: err.error });
  }
};

const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_CREATE_REQUEST });
    const res = await api.post("/product", formData);
    if (res.status !== 200) {
      throw new Error(res.error);
    }
    dispatch({ type: types.PRODUCT_CREATE_SUCCESS });
    dispatch(commonUiActions.showToastMessage("상품 생성 완료", "success"));
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (err) {
    dispatch({ type: types.PRODUCT_CREATE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const deleteProduct = (id) => async (dispatch) => {
  /**delete api 호출 */
  try {
    dispatch({ type: types.PRODUCT_DELETE_REQUEST });
    const res = await api.delete(`product/${id}`);
    if (res.status !== 200) {
      throw new Error("deleteProduct api fail");
    }
    dispatch({ type: types.PRODUCT_DELETE_SUCCESS });
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (err) {
    dispatch({ type: types.PRODUCT_DELETE_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

const editProduct = (formData, id) => async (dispatch) => {
  try {
    dispatch({ type: types.PRODUCT_EDIT_REQUEST });
    const res = await api.put(`/product/${id}`, formData);
    if (res.status !== 200) {
      throw new Error(res.error);
    }
    dispatch({ type: types.PRODUCT_EDIT_SUCCESS, payload: res.data.data });
    dispatch(commonUiActions.showToastMessage("상품 수정 완료", "success"));
    dispatch(getProductList({ page: 1, name: "" }));
  } catch (err) {
    dispatch({ type: types.PRODUCT_EDIT_FAIL, payload: err.error });
    dispatch(commonUiActions.showToastMessage(err.error, "error"));
  }
};

export const productActions = {
  getProductList,
  createProduct,
  deleteProduct,
  editProduct,
  getProductDetail,
};
