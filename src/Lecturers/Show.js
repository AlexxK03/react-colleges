import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import Card from "@mui/joy/Card";
import { useNavigate } from "react-router-dom";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { ButtonGroup } from "@mui/joy";

const Show = () => {
  const { id } = useParams();
  const [lecturer, setLecturer] = useState();
  const navigate = useNavigate();
  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/lecturers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setLecturer(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!lecturer) return <h3>Lecturer not found</h3>;
  return (
    <>
      <Card variant="soft">
        <CardContent>
          <Typography>
            <b>Lecturer Name:</b>
          <Typography> {lecturer.name}</Typography>
          </Typography>
          <Typography>
            <b>Lecturer Address:</b>
          <Typography> {lecturer.address}</Typography>
          </Typography>
          <Typography>
            <b>Lecturer Phone:</b>
          <Typography> {lecturer.phone}</Typography>
          </Typography>
          <Typography>
            <b>Lecturer Email:</b>
          <Typography> {lecturer.email}</Typography>
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
          id={lecturer.id}
          resource="lecturers"
          deleteCallback={() => navigate("/lecturers")}
        ></DeleteButton>
      </ButtonGroup>
    </>
  );
};

export default Show;
