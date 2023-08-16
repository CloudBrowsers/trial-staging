import React, { useEffect, useState } from "react";
import loader from "./assets/loader.gif";
import "./App.css";
import axios from "axios";

const App = () => {
  const searchParams = new URLSearchParams(document.location.search);
  const [errMsg, setErrMsg] = useState("");

  const createNsApi = async () => {
    try {
      const response = await axios.post(
        "https://stg.cloudifytests.com/accept-invite-mail/",
        {
          token: searchParams.get("token"),
        }
      );
      console.log(response.data.data);
      window.location.href = response.data.data.url;
    } catch (error) {
      console.log(error.message);
      setErrMsg(error.message);
    }
  };

  useEffect(() => {
    if (!searchParams.get("token")) setErrMsg("Something went wrong!!");
    else createNsApi();
  }, []);
  return (
    <div className="container">
      {errMsg ? (
        <h1>{errMsg}</h1>
      ) : (
        <>
          <div className="img-container">
            <img src={loader} alt="loading..." />
          </div>
          <h1>your trial is getting created, please wait!!</h1>
        </>
      )}
    </div>
  );
};

export default App;
