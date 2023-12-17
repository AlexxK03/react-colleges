import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { ButtonGroup } from "@mui/joy";

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState();

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/courses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCourse(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!course) return <h3>Course Not Found</h3>;

  return (
    <>
      <Card variant="soft">
        <CardContent>
          <Typography>
            <b>Course Tiltle:</b>
            <Typography level="title-md"> {course.title}</Typography>
          </Typography>
          <Typography>
            <b>Course Description:</b>
            <Typography> {course.description}</Typography>
          </Typography>
          <Typography>
            <b>Course Code:</b>
            <Typography> {course.code}</Typography>
          </Typography>
        </CardContent>
      </Card>
      <ButtonGroup
        color="primary"
        size="md"
        spacing={0}
        variant="soft"
        sx={{ "--ButtonGroup-radius": "20px", marginTop: "6px" }}
      >
        <DeleteButton
          id={course.id}
          resource="courses"
          deleteCallback={() => navigate("/courses")}
        ></DeleteButton>
      </ButtonGroup>
    </>
  );
};

export default Show;
