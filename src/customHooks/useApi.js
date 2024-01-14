import axios from 'axios';
import { useState } from 'react';


const BASE_URL = process.env.REACT_APP_BASE_URL;

export function useApi() {
  const [data, setData] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 20000,
    timeoutErrorMessage:'timeout'
  });


  function fetchData(url, options = {}) {
    return new Promise(async (resolve, reject) => {
      const method = (options.method || 'GET').toLowerCase();

      try {
        setApiLoading(true);
        setApiError(null);
        const response = await api(url, options);
        if (!response.status || response.status < 200 || response.status >= 300) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        setData(response.data);
        resolve(response.data);
      } catch (err) {
        if (err.message==='timeout') {

          setApiError(new Error('Request timed out'));
          reject(new Error('Request timed out'));

        } else {
          setApiError(err);
          reject(err);

        }
      } finally {
        setApiLoading(false);

      }
    });
  }

  return { data, apiLoading, apiError, fetchData };
}
