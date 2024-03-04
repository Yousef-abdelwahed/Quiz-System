/** @format */

import React, { useCallback } from "react";
import { useDispatch } from "react-redux";

interface IProps {
  action?: any;
}
interface IData {
  data?: any;
}

const useAction = (action: IProps) => {
  const dispatch = useDispatch();
  return useCallback(
    async (data: IData) => {
      const response = await dispatch(action(data));
      return response?.payload;
    },
    [dispatch, action]
  );
};

export default useAction;
