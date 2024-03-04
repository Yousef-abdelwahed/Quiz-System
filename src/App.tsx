/** @format */

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthLayout, MasterLayout, ProtectedRoute } from "./Components";
import {
  ForgetPassword,
  Groups,
  Home,
  Login,
  NotFound,
  Questions,
  Quizzes,
  Register,
  ResetPassword,
  ResultFinal,
  Results,
  Students,
  StudentModal
} from "./Pages";
import ChangePassword from "./Pages/Auth/ChangePassword/ChangePassword";
import Help from "./Pages/Help/Help";
import { ToastContainer } from "react-toastify";
import EditQuiz from "./Pages/Quizzes/EditQuiz";
// import LoadingComponent from "./Components/Loading/Loading";
function App() {
  const here = localStorage.getItem("UserRole")
  console.log(here);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-password", element: <ForgetPassword /> },
        { path: "reset-password", element: <ResetPassword /> },
        { path: "change-password", element: <ChangePassword /> },
      ],
    },

    {
      path: "dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: "home", element: <Home /> },
        { path: "groups", element: <Groups /> },
        { path: "quiz", element: <Quizzes /> },
        { path: "quiz/edit/:id", element: <EditQuiz /> },
        { path: "questions", element: <Questions /> },
        { path: "results", element: <Results /> },
        { path: "editModal", element: <StudentModal /> },
        { path: "student", element: <Students /> },
        { path: "results-final", element: <ResultFinal /> },
        { path: "help", element: <Help /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer theme="dark" autoClose={2000} />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
