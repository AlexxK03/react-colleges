import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Grid } from "@mui/joy";
import ButtonGroup from "@mui/joy/ButtonGroup";
import Button from "@mui/joy/Button";
import { Stack } from "@mui/joy";
const Index = (authenticated) => {
  const [lecturers, setLecturers] = useState([]);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setLecturers(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const removeLecturer = (id) => {
    console.log("Deleted", id);

    let updatedLecturers = lecturers.filter((lecturer) => {
      return lecturer.id !== id;
    });
    setLecturers(updatedLecturers);
  };

  if (lecturers.length === 0) return <h3>There are no Lecturers saved</h3>;

  const lecturersList = lecturers.map((lecturer) => {
    return (
      <>
        <Grid xs={4}>
          <div key={lecturer.id}>
            <ButtonGroup
              color="primary"
              size="md"
              spacing={0}
              variant="soft"
              sx={{ "--ButtonGroup-radius": "20px" }}
            >
              {/* {authenticated ? (
                <DeleteButton
                  resource={lecturers}
                  id={lecturer.id}
                  deleteCallback={removeLecturer}
                />
              ) : (
                ""
              )} */}
              {authenticated ? (
                <Button>
                  <Link to={`/lecturers/${lecturer.id}/edit`}>
                    Edit Lecturer
                  </Link>
                </Button>
              ) : (
                ""
              )}
            </ButtonGroup>

            <Card variant="soft" sx={{ marginTop: "6px" }}>
              <CardContent>
                <Typography level="title-md">
                  <Link to={`/lecturers/${lecturer.id}`}>{lecturer.name}</Link>
                </Typography>
                <Typography>{lecturer.email}</Typography>
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
          <h2>All Lecturers</h2>
        </Typography>
        <Button size="md">
          <Link to={`/lecturers/create`}>Create New Lecturer</Link>
        </Button>
      </Stack>{" "}
      <Grid container spacing={4} sx={{ flexGrow: 1 }} alignItems="baseline">
        {lecturersList}
      </Grid>{" "}
    </>
  );
};

export default Index;
