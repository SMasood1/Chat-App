const apiCall = async (initialUrl, initialMethod, initialData) => {
  try {
    let response;
    switch (initialMethod) {
      case 'GET':
        response = await fetch(initialUrl);
        break;
      case 'POST':
        response = await fetch(initialUrl, {
          method: initialMethod,
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
          body: JSON.stringify(initialData)
        })
        break;
      default:
        console.log('Invalid HTTP method');
    }
    if (response.ok) {
      return { resType: 'SUCCESS' };
    } else {
      let resBody = await response.json();
      return resBody;
    }
  } catch (error) {
    return { errorType: 'NETWORK_ERR', message: 'Unable to send request!' };
  }
}
export default apiCall;