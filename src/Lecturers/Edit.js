import React from "react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import { Stack, Textarea } from "@mui/joy";

const Edit = () => {
  const { id } = useParams();
  const [lecturer, setLecturer] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  const errorStyle = {
    color: "red",
  };

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setLecturer(response.data.data);
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

    if (isRequired(["name", "address", "phone", "email"])) {
      let token = localStorage.getItem("token");
      axios
        .put(`https://college-api.vercel.app/api/lecturers/${id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/lecturers/${id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  if (!lecturer) return <h3>Lecturer Not Found</h3>;

  return (
    <>
    <Stack alignItems="baseline">
    <form onSubmit={submitForm}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            onChange={handleForm}
            value={form.name}
            name="name"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address</FormLabel>
          <Textarea
            type="text"
            onChange={handleForm}
            value={form.address}
            name="address"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Phone</FormLabel>
          <Input
            type="text"
            onChange={handleForm}
            value={form.phone}
            name="phone"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="text"
            onChange={handleForm}
            value={form.email}
            name="email"
          />
        </FormControl>
        <Input type="submit" />
      </form>
    </Stack>
      
    </>
  );
};

export default Edit;
