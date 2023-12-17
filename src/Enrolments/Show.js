import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import DeleteButton from "../components/DeleteButton";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import { ButtonGroup, Button } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import Modal from "@mui/joy/Modal";
import ModalClose from "@mui/joy/ModalClose";
const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enrolment, setEnrolment] = useState();
  const [open, setOpen] = useState(false);

  let token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get(`https://college-api.vercel.app/api/enrolments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response);
        setEnrolment(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (!enrolment) return <h3>Enrolment Not Found</h3>;

  return (
    <>
      <Card variant="soft">
        <CardContent>
          <Typography>
            <b>Enrolment Status:</b>
            <Typography> {enrolment.status}</Typography>
          </Typography>
          <Typography>
            <b>Course Title:</b>
            <Typography> {enrolment.course.title}</Typography>
          </Typography>
          <Typography>
            <b>Lecturer name:</b>
            <Typography> {enrolment.lecturer.name}</Typography>
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
        {/* <DeleteButton
          id={enrolment.id}
          resource="enrolments"
          deleteCallback={() => navigate("/enrolments")}
        ></DeleteButton> */}

        <Button onClick={() => setOpen(true)}>Delete</Button>
      </ButtonGroup>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            maxWidth: 500,
            borderRadius: "md",
            p: 3,
            boxShadow: "lg",
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            Enrolment Delete
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
            are you sure you want to delete this enrolment?
            <br />
            <DeleteButton />
          </Typography>
        </Sheet>
      </Modal>
    </>
  );
};

export default Show;
