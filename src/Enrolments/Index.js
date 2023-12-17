import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import DeleteButton from "../components/DeleteButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { Grid, Stack, Button, ButtonGroup } from "@mui/joy";

const Index = (authenticated) => {
  const [enrolments, setEnrolments] = useState([]);
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("https://college-api.vercel.app/api/enrolments", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setEnrolments(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const removeEnrolment = (id) => {
    console.log("Deleted", id);

    let updatedEnrolments = enrolments.filter((enrolment) => {
      return enrolment.id !== id;
    });
    setEnrolments(updatedEnrolments);
  };

  if (enrolments.length === 0) return <h3>There are no enrolments saved</h3>;

  const enrolmentsList = enrolments.map((enrolment) => {
    return (
      <>
        <Grid xs={4}>
          <div key={enrolment.id}>
            <ButtonGroup
              color="primary"
              size="md"
              spacing={0}
              variant="soft"
              sx={{ "--ButtonGroup-radius": "20px" }}
            >
              {authenticated ? (
                <Button>
                  <Link to={`/enrolments/${enrolment.id}/edit`}>
                    Edit enrolment
                  </Link>
                </Button>
              ) : (
                ""
              )}
            </ButtonGroup>
            <Card variant="soft" sx={{ marginTop: "6px" }}>
              <CardContent>
                <Typography level="title-md">
                  <Link to={`/enrolments/${enrolment.id}`}>
                    {enrolment.status}
                  </Link>
                </Typography>
                <Typography>{enrolment.course.title}</Typography>
                <Typography>{enrolment.lecturer.name}</Typography>
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
          <h2>All Enrolments</h2>
        </Typography>
        <Button size="md">
          <Link to={`/enrolments/create`}>Create New enrolment</Link>
        </Button>
      </Stack>
      <Grid container spacing={4} sx={{ flexGrow: 1 }} alignItems="baseline">
        {enrolmentsList}
      </Grid>
    </>
  );
};

export default Index;
