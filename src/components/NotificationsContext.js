import React, { useCallback, useEffect, useState, createContext } from "react";
import { ToastContainer, toast as toastify } from "react-toastify";

const NotificationContext = createContext();

export default NotificationContext;

export function NotificationContextProvider(props) {
  const [toast, setToast] = useState();

  // useEffect(() => {
  //   if (toasts > 0) {
  //     const timer = setTimeout(
  //       () => setToasts((toasts) => toasts.slice(1)),
  //       3000
  //     );
  //     return () => clearTimeout(timer);
  //   }
  // }, [toasts]);

  const addToast = useCallback(
    function (toast) {
      setToast(toast);
    },
    [setToast]
  );

  return (
    <NotificationContext.Provider value={addToast}>
      {props.children}

      {toastify.info(toast, {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })}
    </NotificationContext.Provider>
  );
}
