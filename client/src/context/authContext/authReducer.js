import React, { useReducer } from 'react';
// import styled from 'styled-components';

const SIGNUP = 'SIGNUP';
const SIGNIN = 'SIGNIN';

const authInitialState = {
  token: '',
  email: '',
  password: '',
  errorMessage: ''
}

const authReducer = (state, action) => {
  switch (action.type) {
    case SIGNUP:
      break;
      
    case SIGNIN:
      break;

    default:
      

  }
}

export { authInitialState, authReducer, SIGNIN, SIGNUP };