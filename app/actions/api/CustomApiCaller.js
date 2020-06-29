
import ApiConstants from './ApiConstants';

export default function ApiCaller(path) {
console.log("path in custom caller",path)
// let api ='http://45.79.122.85:8033/api/login?login=test@test.com&password=123'
  let options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
     
    },
    method: 'GET'
  };

  return (fetch(ApiConstants.BASE_URL + path,{options}))
    .then(response => {
      console.log("response of custom new call", response)
      return response.json();
    })
    .then(data => {
      console.log("in custom call", data);
      return data;
    })
    .catch(error => {
      console.log("error", error)
      return { errors: { base: "Something went wrong" } };
    });

}


