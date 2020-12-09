import { SIGNIN, SIGNUP } from './index';

import apiCall from '../../util/apiCall';

async function onSignin(dispatch, { email, password }) {
  // const [state, fetch, setMethod] = useApiCall('URL', 'POST', {
  //   email,
  //   password,
  // });
  // if (state.isError) {
  //   dispatch({ type: SIGNIN, payload: state});
  // }
}
async function onSignup(dispatch, data) {
  const resData = await apiCall('/auth/signup', 'POST', data);
  if (resData !== undefined) {
    dispatch({ type: SIGNUP, payload: resData });
  }
}

export { onSignin, onSignup }