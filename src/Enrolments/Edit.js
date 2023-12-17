import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormHelperText from "@mui/joy/FormHelperText";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Stack } from "@mui/joy";
const Edit = () => {
  const { id } = useParams();
  const [enrolment, setEnrolment] = useState(null);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [form, setForm] = useState({
    date: "",
    time: "",
    course_id: "",
    lecturer_id: "",
    status: "",
  });

  const errorStyle = {
    color: "red",
  };

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/enrolments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setEnrolment(response.data.data);
        setForm(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
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
  }, []);

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

    if (isRequired(["time", "date", "course_id","lecturer_id","status"])) {
      let token = localStorage.getItem("token");

      axios
        .put(`https://college-api.vercel.app/api/enrolments/${id}`, form, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          navigate(`/enrolments/${id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  if (!enrolment) return <h3>Course Not Found</h3>;
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
            value={form.date}
            name="date"
            sx={{ marginRight: "6px" }}

          />
        </FormControl>

        <FormControl>
          <FormLabel>time</FormLabel>
          <Input
            type="time"
            onChange={handleForm}
            value={form.time}
            name="time"
          />
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="lecturerLabel">Lecturer</InputLabel>
          <Select
            labelId="lecturerLabel"
            id="lecturer_id"
            onChange={handleForm}
            name="lecturer_id"
            value={form.lecturer_id}
          >
            {lecturers?.map((lecturer) => (
              <MenuItem key={lecturer.id} value={lecturer.id}>
                {lecturer.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="courseLabel">Course</InputLabel>
          <Select
            labelId="courseLabel"
            id="course_id"
            onChange={handleForm}
            name="course_id"
            value={form.course_id}
          >
            {courses?.map((course) => (
              <MenuItem key={course.id} value={course.id}>
                {course.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="statusLabel">Status</InputLabel>
          <Select
            labelId="statusLabel"
            id="status"
            name="status"
            onChange={handleForm}
            value={form.status}
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
        <Input type="submit" />
      </form>
      </Stack>
    </>
  );
};

export default Edit;
