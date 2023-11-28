import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const errorStyle = {
    color: "red",
  };

  const [form, setForm] = useState({
    name: "alex",
    email: "ak@mail.com",
    password: "password",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const handleClick = () => {
    console.log("clicked", form);

    axios
      .post(`https://college-api.vercel.app/api/register`, {
        name: form.name,
        email: form.password,
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
      Name:
      <input onChange={handleForm} type="text" name="name" value={form.name} />
      <br />
      Email:
      <input
        onChange={handleForm}
        type="text"
        name="email"
        value={form.email}
      />
      <br />
      password:
      <input
        onChange={handleForm}
        type="password"
        name="password"
        value={form.password}
      />
      <button onClick={handleClick}>Submit</button>
      <p style={errorStyle}>{errorMessage}</p>
    </>
  );
};

export default LoginForm;
