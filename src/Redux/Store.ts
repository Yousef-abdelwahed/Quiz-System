/** @format */

import { getQuestions } from "./Featuers/Questions/GetAllQuestionsSlice";
/** @format */
import { configureStore } from "@reduxjs/toolkit";
import getDataSLice from "./Featuers/Groups/getDataSlice";
// import { authReducer } from "./Featuers/Auth/AuthSlice";
import addQuizzesSlice from "./Featuers/Quizzes/addQuizzesSlice";

import LoginReducer  from "./Featuers/Auth/LoginSlice";
import { addQuestion } from "./Featuers/Questions/AddQuestionsSlice";
import { deleteQuestion } from "./Featuers/Questions/DeleteQuestionsSlice";
import { updateQuestions } from "./Featuers/Questions/UpdateQuestionsSlice";
import getQuizzeSlice from "./Featuers/Quizzes/getQuizzeSlice";
import editQuizzesSlice from "./Featuers/Quizzes/editQuizSlice";
const Store = configureStore({
  reducer: {
    // authUser: authReducer,
    LoginReducer,
    getDataSLice,
    addQuizzesSlice,
    getQuizzeSlice,
    // getQuestions,
    addQuestion,
    deleteQuestion,
    updateQuestions,
    editQuizzesSlice,
  },
});

export default Store;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
