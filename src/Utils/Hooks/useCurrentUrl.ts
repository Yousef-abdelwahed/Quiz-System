/** @format */

import { useLocation } from "react-router-dom";

const useCurrentUrl = () => {
  const { pathname } = useLocation();
  const currentUrl = pathname.split("/").pop();
  return currentUrl;
};

export default useCurrentUrl;
