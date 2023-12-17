import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Stack } from "@mui/joy";

const Create = () => {
  const errorStyle = {
    color: "red",
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isRequired = (fields) => {
    let error = true;
    setErrors({});
    fields.forEach((field) => {
      if (!form[field]) {
        console.log(`${field} is required`);
        error = false;
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required`,
          },
        }));
      }
    });
    return error;
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("form submitted", form);

    if (isRequired(["name", "address", "phone", "email"])) {
      let token = localStorage.getItem("token");
      axios
        .post(`https://college-api.vercel.app/api/lecturers`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate("/lecturers");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <>
      <Stack alignItems="baseline">
        <form onSubmit={submitForm}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder="Enter Lecturer Name Here"
              onChange={handleForm}
              value={form.name}
              name="name"
            />
            <FormHelperText style={errorStyle}>
              {errors.name?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              type="text"
              placeholder="Enter Lecturer Address Here"
              onChange={handleForm}
              value={form.address}
              name="address"
            />
            <FormHelperText style={errorStyle}>
              {errors.address?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              type="text"
              placeholder="Enter Lecturer Phone Number Here"
              onChange={handleForm}
              value={form.phone}
              name="phone"
            />
            <FormHelperText style={errorStyle}>
              {errors.address?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="text"
              placeholder="Enter Lecturer Email Here"
              onChange={handleForm}
              value={form.email}
              name="email"
            />
            <FormHelperText style={errorStyle}>
              {errors.email?.message}
            </FormHelperText>
          </FormControl>
          <Input type="submit" />
        </form>
      </Stack>
    </>
  );
};

export default Create;
