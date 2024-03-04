import  { useCallback } from "react";
import { useDispatch } from "react-redux";


interface IProps{
  action?:any
}

const UseActionGet = (action: IProps) => {
  const dispatch = useDispatch();
  return useCallback(
    async () => {
      const response = await dispatch(action());
      return response?.payload;
    },
    [dispatch, action]
  );
};

export default UseActionGet;