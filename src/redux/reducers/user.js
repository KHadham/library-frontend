const initialState = {
  ListUser: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USERS_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_USERS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_USERS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListUser: action.payload.data.result,
      };
///////////////////////////////////////////////////////
    case "POST_USERS_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false
      };
    case "POST_USERS_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true
      };
    case "POST_USERS_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListUser: action.payload.data.result
      };
    default:
      return state;
  }
};

export default users;
