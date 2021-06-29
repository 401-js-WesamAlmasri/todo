import { useState, useEffect } from 'react';
import axios from 'axios';

const useAjax = (endPoint, reqMethod = 'get', body = {}) => {
  const [url, setUrl] = useState(endPoint);
  const [method, setMethod] = useState(reqMethod);
  const [data, setData] = useState(body);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = {
      method,
      url,
      data,
      headers: { 'Content-Type': 'application/json' },
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
  }, [url, method, data]);

  const reload = (url, method, data) => {
    setUrl(url);
    setMethod(method);
    setData(data);
    setLoading(true);
    setError(null);
  };

  return [results, loading, reload, error];
};

export default useAjax;
