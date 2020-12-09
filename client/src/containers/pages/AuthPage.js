import React, { useState, useReducer, useCallback } from 'react';
// import styles from 'styled-components';

import Input from '../../components/UI/Input';

import { onSignin, onSignup, useAuthDispatch, useAuthState } from '../../context/authContext/index';
import ErrorMessages from '../ErrorMessages';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (FORM_INPUT_UPDATE === action.type) {
    const updateInputValue = {
      ...state.inputValue,
      [action.inputType]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputType]: action.inputValidity
    }
    let updatedFormIsValid = true;
    for (let key in state.updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      inputValue: updateInputValue,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    }
  }
  return state;
}

const AuthPage = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [signup, setSignup] = useState(true);

  const { errorMessages } = useAuthState();
  console.log(errorMessages);
  const dispatch = useAuthDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      email: '',
      password: '',
      username: ''
    },
    inputValidities: {
      email: false,
      password: false,
      username: false
    },
    formIsValid: false,
  })
  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      inputType: inputIdentifier,
      value: inputValue,
      isValid: inputValidity
    })
  }, [dispatchFormState]);

  const authHandler = async () => {
    setIsLoading(true);
    try {
      if (signup) {
        onSignup(dispatch, formState.inputValue);
      } else {
        onSignin(dispatch, formState.inputValue);
      }
    } catch (err) {
      console.log(err.message);
    }
    setIsLoading(false);
  }
  return (
    <div>
      <Input
        id="username"
        label="Username"
        required
        type='username'
        errorText="Please enter a valid username."
        onInputChange={inputChangeHandler}
        initialValue=""
      />
      <Input
        id="email"
        label="E-Mail"
        required
        type='email'
        email='true'
        errorText="Please enter a valid email address."
        onInputChange={inputChangeHandler}
        initialValue=""
      />
      <Input
        id="password"
        label="Password"
        type='password'
        required
        minLength={8}
        errorText="Please enter a valid password."
        onInputChange={inputChangeHandler}
        initialValue=""
      />

      {isLoading ?
        (<div>...Loading</div>) :
        (<button onClick={authHandler}>{signup ? 'Signup' : 'Signin'}</button>)}
      <button
        onClick={() => setSignup(prevSignup => !prevSignup)}>Switch to {signup ? 'Signin' : 'Signup'}</button>
      {errorMessages.length > 0 ? <ErrorMessages errorMessages={errorMessages} /> : null}
    </div>
  )
}
export default AuthPage;
