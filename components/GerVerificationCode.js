
const GetVerificationCode = (email) => {

  const request = new Request('https://kp-merge.herokuapp.com/sessions', { method: 'POST', body: `{"email":"${email}"}` });

  fetch(request)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on API server!');
      }
    })
    .then((response) => {
      console.debug(response);
      // …
    }).catch((error) => {
      console.error(error);
    });
}

export default GetVerificationCode