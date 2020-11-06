import { useState, useEffect, useReducer } from 'react';

// Can make this more elegant and able to handle different types of methods and headers

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';

const dataReducer = (state, action) => {
  switch (action.type) {
    case FETCH_INIT:
      return {
        ...state,
        isLoading: true,
        isError: false
      }
    case FETCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload
      }
    case FETCH_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        data: action.error
      }
    default:
      throw new Error();
  }
}
export const useApiCall = (initialUrl, initialMethod, initialData) => {
  const [state, dispatch] = useReducer(dataReducer, {
    isLoading: false,
    isError: null,
    data: initialData ? initialData : ''
  })

  const [method, setMethod] = useState(initialMethod ? initialMethod : null);
  const [url, setUrl] = useState(initialUrl ? initialUrl : '');
  useEffect(() => {
    const fetchData = async () => {
      await dispatch({ type: FETCH_INIT });
      let response;
      try {
        switch (method) {
          case 'GET':
            response = await fetch(url);
            break;
          case 'POST':
            response = await fetch(url, {
              method: method,
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(state.data)
            });
            break;
          default:
            console.log('Incorrect HTTP Request Method');
        }
        if (response.ok) {
          let resBody = await response.json();
          dispatch({ type: FETCH_SUCCESS, payload: resBody });
        } else {
          let resBody = await response.json();
          dispatch({ type: FETCH_FAILURE, error: resBody });
        }
      } catch (error) {
        dispatch({ type: FETCH_FAILURE, error: 'Unable to send request!' });
      }
    }
    if (method && url) {
      fetchData();
    }
  }, [url, method, state.data]);
  return [state, setUrl, setMethod]
} 