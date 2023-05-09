import axios from "axios";
import { useState } from "react";

const useHttp = () => {
  const [errorMessage, setErrorMessage] = useState(null);

  const sendHttpRequest = (url, method, body, action) => {
    axios({
      method: method,
      url: url,
      data: body,
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Something went wrong. Please try again later.");
        }
        action(response.data);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return [errorMessage, sendHttpRequest];
};

export default useHttp;
