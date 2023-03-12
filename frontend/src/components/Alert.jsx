import alertState from "../Atoms/alert.atom";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

const Alert = () => {
  const [alert, setAlert] = useRecoilState(alertState);
  const { message, type, show } = alert;

  const alertClasses =
    type === "success"
      ? "bg-green-200 text-green-700 rounded border border-green-500"
      : "bg-red-200 text-red-700 rounded border border-red-500";

  const clearAlert = () => {
    setTimeout(() => {
      setAlert({ ...alert, show: false });
    }, 2000);
  };

  if (show) {
    clearAlert();
  }

  return show ? (
    <div
      className={`fixed top-16 mt-1 left-1/2 transform -translate-x-1/2 p-2 max-w-4xl w-full ${alertClasses} `}
    >
      <p className='text-sm font-medium'>{message}</p>
    </div>
  ) : null;
};

export default Alert;
