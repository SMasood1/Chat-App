import React, { useState, useReducer, useCallback } from 'react';
// import styles from 'styled-components';

import Input from '../../components/UI/Input';

import { OnSignin, OnSignup, useAuthDispatch } from '../../context/authContext/index';

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
  // const [error, setError] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [signup, setSignup] = useState(true);
  const dispatch = useAuthDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValue: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
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

  const authHandler = () => {
    // setIsLoading(true);
    let result; 
    try {
      if(signup){
        OnSignup(dispatch, formState.inputValue);
      }
    } catch {

    }
  }
  return (
    <div>
      <Input
        id="email"
        label="E-Mail"
        required
        type='email'
        email
        errorText="Please enter a valid email address."
        onInputChange={inputChangeHandler}
        initialValue=""
      />
      <Input
        id="password"
        label="Password"
        type='password'
        required
        minLength={5}
        autoCapitalize="none"
        errorText="Please enter a valid password."
        onInputChange={inputChangeHandler}
        initialValue=""
      />
      <button
        onClick={authHandler}>{signup ? 'Signup' : 'Signin'}</button>
      <button
        onClick={authHandler}
        onClick={() => setSignup(prevSignup => !prevSignup)}>Switch to {signup ? 'Signin' : 'Signup'}</button>
    </div>
  )
}
export default AuthPage;
