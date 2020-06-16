
import ApiConstants from './ApiConstants';

export default function ApiCaller(path) {
  return (fetch(ApiConstants.BASE_URL + path))
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


