const initialState = {
  ListBuku: [],
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const buku = (state = initialState, action) => {
  switch (action.type) {
/////////////////////////////////////////////////////    
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
///////////POST////////////////////////////////////////////
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
/////////////GET1//////////////////////////////////////////
    case 'GET_BOOK1_PENDING': // in case when loading post data
      return {
        ...state,
        isLoading: true,
        isFulFilled: false,
        isRejected: false
        }
    case 'GET_BOOK1_REJECTED': // in case error network/else
        return {
            ...state,
            isLoading: false,
            isRejected: true,
        }
    case 'GET_BOOK1_FULFILLED': // in case successfuly post data
        return {
            ...state,
            isLoading: false,
            isFulFilled: true,
            ListBuku: action.payload.data,
        }
///////////////DELETE////////////////////////////////////////        
      case 'DELETE_BOOK_PENDING': // in case when loading post data
          return {
              ...state,
              isLoading: true,
              isFulFilled: false,
              isRejected: false
          }
      case 'DELETE_BOOK_REJECTED': // in case error network/else
          return {
              ...state,
              isLoading: false,
              isRejected: true,
          }
      case 'DELETE_BOOK_FULFILLED': // in case successfuly post data
          return {
              ...state,
              isLoading: false,
              isFulFilled: true,
              ListBuku: [state.ListBuku, action.payload.data[0]],
          }
//////////////UPDATE/////////////////////////////////////////          
      case 'UPDATE_BOOK_PENDING': // in case when loading post data
          return {
              ...state,
              isLoading: true,
              isFulFilled: false,
              isRejected: false
          }
      case 'UPDATE_BOOK_REJECTED': // in case error network/else
          return {
              ...state,
              isLoading: false,
              isRejected: true,
          }
      case 'UPDATE_BOOK_FULFILLED': // in case successfuly post data
          return {
              ...state,
              isLoading: false,
              isFulFilled: true,
              ListBuku: [state.ListBuku, action.payload.data[0]],
          }
    default:
      return state;
  }
};

export default buku;
