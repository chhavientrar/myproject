import React, { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "./cardStyle.css";
import { LOGIN, LOGOUT } from "store/actions";
import accountReducer from "store/accountReducer";

const initialState = {
  isLoggedIn: window.localStorage.getItem("isLoggedIn"),
  isInitialized: false,
  user: null,
};

const SuccessCard = ({ isSubmitting, responseData }) => {
  const [isCompleted, setIsCompleted] = useState(isSubmitting);
  const [state, dispatch] = useReducer(accountReducer, initialState);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCompleted(true);
      dispatch({
        type: LOGIN,
        payload: {
          isLoggedIn: true,
          user: responseData,
        },
      });
      window.location.reload();
    }, 2000);

    return () => clearTimeout(timer);
  }, [isSubmitting]); 

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div className={`circle-loader ${isCompleted ? "load-complete" : ""}`}>
        <div className={`checkmark ${isCompleted ? "draw" : ""}`}></div>
      </div>
    </div>
  );
};

export default SuccessCard;
