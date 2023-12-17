import React from "react";
import LoginForm from "../components/LoginForm";
import { Typography } from "@mui/joy";
const Home = ({ authenticated, onAuthenticated }) => {
  return (
    <>
      {!authenticated ? (
        <LoginForm
          authenticated={authenticated}
          onAuthenticated={onAuthenticated}
        />
      ) : (
        <Typography><h1>You are Logged in!</h1></Typography>
      )}
    </>
  );
};

export default Home;
