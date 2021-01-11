import {useState} from 'react';


export function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function processRequest(httpRequest) {
    setIsLoading(true);
    setError(null);
    return httpRequest
      .then(res => {
        setIsLoading(false);
        setError(null);
        return res;
      })
      .catch(err => {
        setIsLoading(false);
        setError(err);
      });
  }

  return [processRequest, isLoading, error];
}
