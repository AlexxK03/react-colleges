import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Stack, Textarea } from "@mui/joy";

const Edit = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    title: "",
    code: "",
    description: "",
    points: "",
    level: "",
  });

  const errorStyle = {
    color: "red",
  };

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setCourse(response.data.data);
        setForm(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  const handleForm = (e) => {
    setForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const isRequired = (fields) => {
    let included = true;
    setErrors({});

    fields.forEach((field) => {
      if (!form[field]) {
        setErrors((prevState) => ({
          ...prevState,
          [field]: {
            message: `${field} is required`,
          },
        }));
      }
    });
    return included;
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitted", form);

    if (isRequired(["title", "code", "description", "points", "level"])) {
      let token = localStorage.getItem("token");

      axios
        .put(`https://college-api.vercel.app/api/courses/${id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/courses/${id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  if (!course) return <h3>Course Not Found</h3>;
  return (
    <>
    <Stack
    alignItems="baseline">
    <form onSubmit={submitForm}>
        <FormControl>
          <FormLabel>Title</FormLabel>
          <Input
            type="text"
            onChange={handleForm}
            value={form.title}
            name="title"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Code</FormLabel>
          <Input
            type="text"
            onChange={handleForm}
            value={form.code}
            name="code"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Description</FormLabel>
          <Textarea
            type="text"
            onChange={handleForm}
            value={form.description}
            name="description"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Points</FormLabel>
          <Input
            type="text"
            onChange={handleForm}
            value={form.points}
            name="points"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Level</FormLabel>
          <Input
            type="text"
            onChange={handleForm}
            value={form.level}
            name="level"
          />
        </FormControl>
        <Input type="submit" />
      </form>
    </Stack>
      
    </>
  );
};

export default Edit;
