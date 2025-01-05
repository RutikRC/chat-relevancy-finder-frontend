import { message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useResponseHandler = ({ response, type, cancel, navigateTo, error }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!response) return;

    const handleSuccess = () => {
      message.success(type, 4);

      if (navigateTo) navigate(navigateTo);
      if (typeof cancel === "function") cancel();
    };

    const handleError = () => {
      message.error(error || "Something Went Wrong", 4);
    };

    response.isSuccess ? handleSuccess() : response.isError && handleError();
  }, [response, type, cancel, navigateTo, error, navigate]);
};

export default useResponseHandler;
