import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DeleteButton from "../components/DeleteButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import { Button } from "@mui/joy";
import Typography from "@mui/joy/Typography";
import { Grid, Stack } from "@mui/joy";
import ButtonGroup from "@mui/joy/ButtonGroup";
// ALEX USE .DATA.DATA FOR THE RESPONSE. TO SET VARIABLE PLZ
const Index = (authenticated) => {
  const [courses, setCourses] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    

    axios
      .get("https://college-api.vercel.app/api/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setCourses(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const removeCourse = (id) => {
    console.log("Deleted", id);

    let updatedCourses = courses.filter((course) => {
      return course.id !== id;
    });
    setCourses(updatedCourses);
  };

  if (courses.length === 0) return <h3>There are no courses saved</h3>;

  const coursesList = courses.map((course) => {
    return (
      <>
        <Grid xs={4}>
          <div key={course.id}>
            <ButtonGroup
              color="primary"
              size="md"
              spacing={0}
              variant="soft"
              sx={{ "--ButtonGroup-radius": "20px" }}
            >
              {authenticated ? (
                <Button>
                  <Link to={`/courses/${course.id}/edit`}>Edit course</Link>
                </Button>
              ) : (
                ""
              )}
            </ButtonGroup>

            <Card variant="soft" sx={{ marginTop: "6px" }}>
              <CardContent>
                <Typography level="title-md">
                  <Link to={`/courses/${course.id}`}>{course.title}</Link>
                </Typography>
                <Typography>{course.code}</Typography>
              </CardContent>
            </Card>
          </div>
        </Grid>
      </>
    );
  });
  return (
    <>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="baseline"
        spacing={2}
      >
        <Typography>
          <h2>All Courses</h2>
        </Typography>
        <Button size="md">
          <Link to={`/courses/create`}>Create New Course</Link>
        </Button>
      </Stack>
      <Grid container spacing={4} sx={{ flexGrow: 1 }} alignItems="baseline">
        {coursesList}
      </Grid>
    </>
  );
};

export default Index;
