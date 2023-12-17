import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/joy";

const Create = () => {
  const errorStyle = {
    color: "red",
  };

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const [form, setForm] = useState({
    course_id: "",
    lecturer_id: "",
    date: "",
    time: "",
    status: "",
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

  let token = localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("https://college-api.vercel.app/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setCourses(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });

    axios
      .get(`https://college-api.vercel.app/api/lecturers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setLecturers(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    console.log("form submitted", form);

    if (isRequired(["date", "time", "status", "course_id", "lecturer_id"])) {
      axios
        .post(`https://college-api.vercel.app/api/enrolments`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate("/enrolments");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };
  return (
    <>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="baseline"
        spacing={2}
      >
        <form onSubmit={submitForm}>
          <FormControl>
            <FormLabel>Date</FormLabel>
            <Input
              type="date"
              onChange={handleForm}
              value={form.data}
              name="date"
              sx={{ marginRight: "6px" }}
            />
            <FormHelperText style={errorStyle}>
              {errors.date?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>Time</FormLabel>
            <Input
              type="time"
              onChange={handleForm}
              value={form.time}
              name="time"
            />
            <FormHelperText style={errorStyle}>
              {errors.time?.message}
            </FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="statusLabel">Status</InputLabel>
            <Select
              labelId="statusLabel"
              id="status"
              name="status"
              onChange={handleForm}
            >
              <MenuItem value="interested">Interested</MenuItem>
              <MenuItem value="assigned">Assigned</MenuItem>
              <MenuItem value="career_break">Career Break</MenuItem>
              <MenuItem value="associate">Associate</MenuItem>
            </Select>
            <FormHelperText style={errorStyle}>
              {errors.status?.message}
            </FormHelperText>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="courseLabel">Course</InputLabel>
            <Select
              labelId="courseLabel"
              id="course_id"
              onChange={handleForm}
              name="course_id"
            >
              {courses?.map((course) => (
                <MenuItem key={course.id} value={course.id}>
                  {course.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="lecturerLabel">Lecturer</InputLabel>
            <Select
              labelId="lecturerLabel"
              id="lecturer_id"
              onChange={handleForm}
              name="lecturer_id"
            >
              {lecturers?.map((lecturer) => (
                <MenuItem key={lecturer.id} value={lecturer.id}>
                  {lecturer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Input type="submit" />
        </form>
      </Stack>
    </>
  );
};

export default Create;
