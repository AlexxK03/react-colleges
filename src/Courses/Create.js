import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Stack, Textarea } from "@mui/joy";
// import Form from '@mui/joy/Form';

const Create = () => {
  const errorStyle = {
    color: "red",
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    points: "",
    level: "",
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

    if (isRequired(["title", "code", "description", "points", "level"])) {
      let token = localStorage.getItem("token");
      axios
        .post(`https://college-api.vercel.app/api/courses`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate("/courses");
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
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter Course Title Here"
              onChange={handleForm}
              value={form.title}
              name="title"
            />
            <FormHelperText style={errorStyle}>
              {errors.title?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Code</FormLabel>
            <Input
              type="text"
              placeholder="Enter Course Code Here"
              onChange={handleForm}
              value={form.code}
              name="code"
            />
            <FormHelperText style={errorStyle}>
              {errors.code?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea
              type="text"
              placeholder="Enter Course Description Here"
              onChange={handleForm}
              value={form.description}
              name="description"
            />
            <FormHelperText style={errorStyle}>
              {errors.description?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Points</FormLabel>
            <Input
              type="text"
              placeholder="Enter Course Points Here"
              onChange={handleForm}
              value={form.points}
              name="points"
            />
            <FormHelperText style={errorStyle}>
              {errors.points?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Level</FormLabel>
            <Input
              type="text"
              placeholder="Enter Course Level Here"
              onChange={handleForm}
              value={form.level}
              name="level"
            />
            <FormHelperText style={errorStyle}>
              {errors.level?.message}
            </FormHelperText>
          </FormControl>
          <Input type="submit" />
        </form>
      </Stack>
    </>
  );
};

export default Create;
