import { useState, useEffect } from 'react';
import axios from 'axios';

const useAjax = (endPoint, reqMethod = 'get', body = {}, authParams={}) => {
  const [url, setUrl] = useState(endPoint);
  const [method, setMethod] = useState(reqMethod);
  const [data, setData] = useState(body);
  const [auth, setAuth] = useState(authParams);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method,
      url,
      data,
      headers: { 'Content-Type': 'application/json' },
      auth,
    };

    (async () => {
      try {
        if (url) {
          const response = await axios(options);
          setResults(response);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    })();
  }, [url, method, data, loading, auth]);

  const reload = (url = endPoint, method = reqMethod, data = body, authParams = auth) => {
    setUrl(url);
    setMethod(method);
    setData(data);
    setAuth(authParams);
    setLoading(true);
    setError(null);
  };

  return [results, reload, loading, error];
};

export default useAjax;
