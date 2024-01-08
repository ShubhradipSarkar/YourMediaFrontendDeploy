import React, { useEffect } from "react";
import axios from "axios";

export const Logout = () => {
  useEffect(() => {
    (async () => {
      try {
        await axios.post(
          'http://127.0.0.1:8000/api/v1/logout',
          { refresh_token: localStorage.getItem('refresh_token') },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          }
        );

        localStorage.clear();
        delete axios.defaults.headers.common['Authorization'];
        window.location.href = '/login';
      } catch (e) {
        console.log('Logout not working', e);
      }
    })();
  }, []);

  return <div></div>;
};
