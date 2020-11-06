import React from 'react';
import { useApiCall } from '../../hooks/useApiCall';
import { SIGNIN, SIGNUP } from './index';

async function OnSignin(dispatch, { email, password }) {
  // const [state, fetch, setMethod] = useApiCall('URL', 'POST', {
  //   email,
  //   password,
  // });
  // if (state.isError) {
  //   dispatch({ type: SIGNIN, payload: state});
  // }


}
function OnSignup(props) {
  const [state, fetch, setMethod] = useApiCall('/api/signup', 'POST', {
    props.email,
    props.password,
  });
  console.log('hero');
  // if (state.isError) {
  //   // dispatch({ type: SIGNUP, payload: state });
  // } else {

  // }
  return <div>Hello</div>;
}

export { OnSignin, OnSignup }