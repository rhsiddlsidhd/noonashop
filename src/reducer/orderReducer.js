import * as types from "../constants/order.constants";

const initialState = {
  orderNum: "",
  loading: false,
  error: "",
  orderList: [],
  totalPageNum: 0,
  selectedOrder: [],
};

function orderReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case types.GET_ORDER_REQUEST:
    case types.GET_ORDER_LIST_REQUEST:
    case types.CREATE_ORDER_REQUEST:
    case types.UPDATE_ORDER_REQUEST: {
      return { ...state, loading: true };
    }

    case types.CREATE_ORDER_SUCCESS: {
      return { ...state, loading: false, orderNum: payload };
    }

    case types.GET_ORDER_SUCCESS: {
      return { ...state, loading: false, orderList: payload };
    }
    case types.GET_ORDER_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        orderList: payload.data,
        totalPageNum: payload.totalPageNum,
      };
    case types.UPDATE_ORDER_SUCCESS: {
      const updatedOrderList = state.orderList.map((item) => {
        return item._id === payload.data._id ? payload.data : item;
      });
      return { ...state, loading: false, orderList: updatedOrderList };
    }
    case types.SET_SELECTED_ORDER:
      return { ...state, loading: false, selectedOrder: payload };

    case types.CREATE_ORDER_FAIL: {
      return { ...state, loading: false, error: payload };
    }
    case types.UPDATE_ORDER_FAIL:
    case types.GET_ORDER_FAIL:
    case types.GET_ORDER_LIST_FAIL:
      return { ...state, loading: false };
    default:
      return state;
  }
}
export default orderReducer;
