const initialState = {
  ListHistory: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const buku = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_HISTORY_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_HISTORY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_HISTORY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListHistory: action.payload.data,
      };
///////////////////////////////////////////////////////
    case "POST_HISTORY_PENDING":
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false
        };
      case "POST_HISTORY_REJECTED":
        return {
          ...state,
          isLoading: false,
          isRejected: true
        };
      case "POST_HISTORY_FULFILLED":
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          ListHistory: action.payload.data
        };
    default:
      return state;
  }
};

export default buku;
