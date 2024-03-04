import { ReactNode} from "react";
import "./ProtectedRoute.module.scss";
import { Navigate } from "react-router-dom";

interface prop {
  children: ReactNode;
}
const ProtectedRoute = ({ children }: prop) => {
  if(!localStorage.getItem("UserToken")){
    return <Navigate to='/' />
  }else{
    return children;
  }
};

export default ProtectedRoute;
