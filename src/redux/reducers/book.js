const initialState = {
  ListBuku: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const buku = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOKS_PENDING':
      return {
        ...state,
        isLoading: true,
        isFulfilled: false,
        isRejected: false,
      };
    case 'GET_BOOKS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_BOOKS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        ListBuku: action.payload.data,
      };
///////////////////////////////////////////////////////
      case "POST_BOOK_PENDING":
          return {
            ...state,
            isLoading: true,
            isRejected: false,
            isFulfilled: false
          };
        case "POST_BOOK_REJECTED":
          return {
            ...state,
            isLoading: false,
            isRejected: true
          };
        case "POST_BOOK_FULFILLED":
          return {
            ...state,
            isLoading: false,
            isFulfilled: true,
            ListBuku: action.payload.data
          };

    default:
      return state;
  }
};

export default buku;
