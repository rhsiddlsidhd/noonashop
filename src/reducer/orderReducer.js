import * as types from "../constants/order.constants";

const initialState = {
  orderNum: "",
  loading: false,
  error: "",
  orderList: [],
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ORDER_REQUEST:
    case types.CREATE_ORDER_REQUEST: {
      return { ...state, loading: true };
    }

    case types.CREATE_ORDER_SUCCESS: {
      return { ...state, loading: false, orderNum: payload };
    }
    case types.GET_ORDER_SUCCESS: {
      return { ...state, loading: false, orderList: payload };
    }

    case types.CREATE_ORDER_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    case types.GET_ORDER_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
export default orderReducer;
