import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Stack from "@mui/joy/Stack";

const LoginForm = ({ authenticated, onAuthenticated }) => {
  const errorStyle = {
    color: "red",
  };

  const [form, setForm] = useState({
    email: "ak@mail",
    password: "secret",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const handleClick = () => {
    console.log("clicked", form);

    axios
      .post(`https://college-api.vercel.app/api/login`, {
        email: form.email,
        password: form.password,
      })
      .then((response) => {
        console.log(response.data);
        onAuthenticated(true, response.data.token);
      })
      .catch((err) => {
        console.error(err);
        console.log(err.response.data.message);
        setErrorMessage(err.response.data.message);
      });
  };

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <>
      <Stack alignItems="baseline" direction="column" justifyContent="center">
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            onChange={handleForm}
            placeholder="Enter Your Email"
            type="text"
            name="email"
            value={form.email}
          />
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            onChange={handleForm}
            placeholder="Enter Your password"
            type="password"
            name="password"
            value={form.password}
          />
        </FormControl>
      </Stack>
      <br />
      <Button onClick={handleClick}>Submit</Button>
      <p style={errorStyle}>{errorMessage}</p>
    </>
  );
};

export default LoginForm;
